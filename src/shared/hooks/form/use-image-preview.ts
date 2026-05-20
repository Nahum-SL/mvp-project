"use client";

import { useEffect, useState } from "react";

interface Props {
  initialImage?: string | null;
}

export function useImagePreview({
  initialImage = null,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImage,
  );

  // Cleanup automático
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (file: File | null) => {
    // Limpiar blob anterior
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const blobUrl = URL.createObjectURL(file);

    setPreviewUrl(blobUrl);
  };

  const removeImage = () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
  };

  return {
    previewUrl,
    handleImageChange,
    removeImage,
  };
}