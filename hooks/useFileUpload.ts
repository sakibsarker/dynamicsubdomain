"use client";

import { useState, useCallback, useRef } from "react";

export type UploadStatus = "pending" | "uploading" | "done" | "error";

export interface UploadingFile {
  key: string;
  file: File;
  progress: number;
  status: UploadStatus;
  mediaId: number | null;
  error?: string;
}

let _keyCounter = 0;
const nextKey = () => `upload-${Date.now()}-${++_keyCounter}`;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export function usePublicFileUpload(
  options: { extraFields?: Record<string, string> } = {},
) {
  const { extraFields = {} } = options;
  const endpoint = "/media/public-upload/";

  const [files, setFiles] = useState<UploadingFile[]>([]);
  const abortControllers = useRef<Map<string, XMLHttpRequest>>(new Map());
  const doneTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const uploadSingleFile = (key: string, file: File) => {
    const xhr = new XMLHttpRequest();
    abortControllers.current.set(key, xhr);

    const formData = new FormData();
    formData.append("files", file);
    Object.entries(extraFields).forEach(([k, v]) => {
      formData.append(k, v);
    });

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setFiles((prev) =>
          prev.map((f) =>
            f.key === key ? { ...f, progress, status: "uploading" } : f,
          ),
        );
      }
    };

    xhr.onload = () => {
      abortControllers.current.delete(key);
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          const mediaId = response.files?.[0]?.id ?? null;
          setFiles((prev) =>
            prev.map((f) =>
              f.key === key
                ? { ...f, progress: 100, status: "uploading", mediaId }
                : f,
            ),
          );
          const timer = setTimeout(() => {
            doneTimers.current.delete(key);
            setFiles((prev) =>
              prev.map((f) => (f.key === key ? { ...f, status: "done" } : f)),
            );
          }, 600);
          doneTimers.current.set(key, timer);
        } catch {
          setFiles((prev) =>
            prev.map((f) =>
              f.key === key
                ? {
                    ...f,
                    progress: 100,
                    status: "error",
                    error: "Invalid server response",
                  }
                : f,
            ),
          );
        }
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.key === key
              ? {
                  ...f,
                  status: "error",
                  error: `Upload failed (${xhr.status})`,
                }
              : f,
          ),
        );
      }
    };

    xhr.onerror = () => {
      abortControllers.current.delete(key);
      setFiles((prev) =>
        prev.map((f) =>
          f.key === key ? { ...f, status: "error", error: "Network error" } : f,
        ),
      );
    };

    xhr.onabort = () => {
      abortControllers.current.delete(key);
    };

    xhr.open("POST", `${API_BASE_URL}${endpoint}`);
    xhr.send(formData);
  };

  const addFiles = useCallback(
    (newFiles: File[]) => {
      const entries: UploadingFile[] = newFiles.map((file) => ({
        key: nextKey(),
        file,
        progress: 0,
        status: "uploading" as UploadStatus,
        mediaId: null,
      }));
      setFiles((prev) => [...prev, ...entries]);
      entries.forEach((entry) => {
        uploadSingleFile(entry.key, entry.file);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [extraFields],
  );

  const removeFile = useCallback(
    (key: string) => {
      const xhr = abortControllers.current.get(key);
      if (xhr) {
        xhr.abort();
        abortControllers.current.delete(key);
      }
      const timer = doneTimers.current.get(key);
      if (timer) {
        clearTimeout(timer);
        doneTimers.current.delete(key);
      }
      const fileEntry = files.find((f) => f.key === key);
      if (fileEntry?.mediaId) {
        fetch(`${API_BASE_URL}/media/${fileEntry.mediaId}/public-delete/`, {
          method: "DELETE",
        }).catch(() => {});
      }
      setFiles((prev) => prev.filter((f) => f.key !== key));
    },
    [files],
  );

  const reset = useCallback(() => {
    abortControllers.current.forEach((xhr) => xhr.abort());
    abortControllers.current.clear();
    doneTimers.current.forEach((t) => clearTimeout(t));
    doneTimers.current.clear();
    setFiles([]);
  }, []);

  const isUploading = files.some((f) => f.status === "uploading");
  const mediaIds = files
    .filter((f) => f.status === "done" && f.mediaId !== null)
    .map((f) => f.mediaId as number);

  return { files, addFiles, removeFile, reset, isUploading, mediaIds };
}
