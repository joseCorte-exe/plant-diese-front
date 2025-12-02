import { useState, useCallback } from "react";

export function useImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = useCallback(function (file: File | string | null) {
    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    if (typeof file === "string") {
      setSelectedFile(null);
      setPreviewUrl(file);
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = function () {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const clearFile = useCallback(function () {
    setSelectedFile(null);
    setPreviewUrl(null);
  }, []);

  return {
    selectedFile,
    previewUrl,
    handleFileSelect,
    clearFile,
  };
}
