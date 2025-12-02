import { useCallback, useState } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "../../lib/utils";

interface ImageUploadProps {
  onFileSelect: (file: File | string) => void;
  disabled?: boolean;
}

export function ImageUpload({
  onFileSelect,
  disabled = false,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEvents = (e: React.DragEvent, isEntering: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(isEntering);
    }
  };

  const handleDrop = useCallback(
    function (e: React.DragEvent) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));

      if (imageFile) {
        onFileSelect(imageFile);
      }
    },
    [onFileSelect, disabled],
  );

  const handleFileInputChange = useCallback(
    function (e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect],
  );

  const handleClick = () => {
    if (!disabled) {
      document.getElementById("file-input")?.click();
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragEnter={(e) => handleDragEvents(e, true)}
      onDragLeave={(e) => handleDragEvents(e, false)}
      onDragOver={(e) => e.preventDefault()} // Necessary to allow drop
      onDrop={handleDrop}
      className={cn(
        "flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-8 text-center transition-colors",
        isDragging
          ? "border-blue-500 bg-blue-500/10"
          : "border-gray-300 bg-transparent hover:border-blue-400 hover:bg-black/5",
        disabled ? "cursor-not-allowed opacity-60" : ""
      )}
    >
      <div
        className={cn(
          "grid h-16 w-16 place-items-center rounded-full bg-black/5 transition-colors",
          isDragging ? "bg-blue-500/20" : ""
        )}
      >
        <UploadCloud
          className={cn(
            "h-8 w-8 text-blue-500 transition-colors",
            isDragging ? "text-blue-600" : ""
          )}
        />
      </div>
      <div>
        <p className="font-semibold text-foreground">
          Click or drag & drop to upload
        </p>
        <p className="text-sm text-muted-foreground">
          Select a photo of a plant leaf
        </p>
      </div>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        disabled={disabled}
        className="hidden"
      />
    </div>
  );
}