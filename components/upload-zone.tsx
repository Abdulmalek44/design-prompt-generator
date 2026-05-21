"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import * as React from "react";

interface UploadZoneProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  previewUrl: string | null;
  isAnalyzing: boolean;
}

export function UploadZone(props: UploadZoneProps) {
  const { onFileSelect, selectedFile, previewUrl, isAnalyzing } = props;
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleRemove = React.useCallback(() => {
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [onFileSelect]);

  if (previewUrl && selectedFile) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-border bg-card">
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={previewUrl}
            alt="Design preview"
            className="h-full w-full object-contain bg-muted/50"
          />
          {!isAnalyzing && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-3 top-3 h-8 w-8 rounded-full shadow-lg"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove image</span>
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3 border-t border-border bg-muted/30 px-4 py-3">
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
          <span className="flex-1 truncate text-sm text-foreground">
            {selectedFile.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-base font-medium text-foreground">
            Drop your design here
          </p>
          <p className="text-sm text-muted-foreground">
            or click to browse files
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-md bg-muted px-2 py-1">PNG</span>
          <span className="rounded-md bg-muted px-2 py-1">JPG</span>
          <span className="rounded-md bg-muted px-2 py-1">WEBP</span>
        </div>
      </div>
    </div>
  );
}
