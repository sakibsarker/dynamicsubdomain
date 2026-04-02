"use client";

import { useState } from "react";

export default function ImageWithSkeleton({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src) return null;

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className={`${className} bg-gray-200/30 animate-pulse`}></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${
          isLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
        } transition-opacity duration-300`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
