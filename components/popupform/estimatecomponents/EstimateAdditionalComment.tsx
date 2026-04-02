"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, X, Check, AlertCircle } from "lucide-react";
import { usePublicFileUpload } from "@/hooks/useFileUpload";

interface Props {
  onCommentsChange: (comments: string) => void;
  onMediaIdsChange: (mediaIds: number[]) => void;
  onIsUploading?: (isUploading: boolean) => void;
}

export default function EstimateAdditionalComment({
  onCommentsChange,
  onMediaIdsChange,
  onIsUploading,
}: Props) {
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxLength = 500;

  const { files, addFiles, removeFile, isUploading, mediaIds } =
    usePublicFileUpload();

  useEffect(() => {
    onMediaIdsChange(mediaIds);
  }, [mediaIds, onMediaIdsChange]);
  useEffect(() => {
    onIsUploading?.(isUploading);
  }, [isUploading, onIsUploading]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
    onCommentsChange(e.target.value);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length > 0) addFiles(newFiles);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="flex-1 px-4">
      <h2 className="text-2xl font-semibold text-black mb-6 leading-tight">
        Anything else you&apos;d like us to know?
      </h2>
      <div className="relative mb-4">
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="I hear a ticking noise coming from my engine bay..."
          className="w-full min-h-[150px] resize-none border border-gray-300 rounded-lg text-base p-3 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 focus:outline-none"
          maxLength={maxLength}
        />
        <div className="absolute bottom-3 right-3 text-sm text-gray-400">
          {description.length} / {maxLength}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {files.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Selected Photos:
          </h3>
          <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-2">
            {files.map((f) => (
              <div key={f.key} className="relative bg-gray-100 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {f.status === "done" && (
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                    )}
                    {f.status === "error" && (
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    )}
                    <span className="text-sm text-gray-600 truncate">
                      {f.file.name}
                    </span>
                    {f.status === "uploading" && (
                      <span className="text-xs text-blue-500 shrink-0">
                        {f.progress}%
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => removeFile(f.key)}
                    className="text-red-500 hover:text-red-700 shrink-0 ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {f.status === "uploading" && (
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${f.progress}%` }}
                    />
                  </div>
                )}
                {f.status === "error" && f.error && (
                  <p className="text-xs text-red-500 mt-1">{f.error}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <div className="relative">
            <div className="w-12 h-10 border-2 border-gray-400 rounded bg-white transform rotate-12 absolute -top-1 -left-1 flex items-center justify-center">
              <div className="w-0 h-0 border-l-[6px] border-l-gray-400 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
            </div>
            <div className="w-12 h-10 border-2 border-gray-400 rounded bg-white flex items-center justify-center relative z-10">
              <div className="w-3 h-3 bg-gray-400 rounded-full absolute top-2 left-2"></div>
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-gray-400 absolute bottom-2 right-2"></div>
            </div>
          </div>
          <div
            className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-20 cursor-pointer hover:bg-green-600"
            onClick={triggerFileInput}
          >
            <Plus className="w-4 h-4 text-white" />
          </div>
        </div>
        <p
          className="text-gray-600 text-base font-medium cursor-pointer"
          onClick={triggerFileInput}
        >
          Attach photos (optional)
        </p>
      </div>
    </div>
  );
}
