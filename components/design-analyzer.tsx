"use client";

import { AnalysisResult } from "@/components/analysis-result";
import { AnalyzeButton } from "@/components/analyze-button";
import { UploadZone } from "@/components/upload-zone";
import { useDesignAnalyzer } from "@/hooks/useDesignAnalyzer";

export function DesignAnalyzer() {
  // Pull all states and functions cleanly out of our hook
  const {
    selectedFile,
    previewUrl,
    result,
    isLoading,
    error,
    handleFileSelect,
    handleAnalyze,
  } = useDesignAnalyzer();

  // Your layout returns exactly as it was originally written!
  return (
    <div className="space-y-6">
      <UploadZone
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        previewUrl={previewUrl}
        isAnalyzing={isLoading}
      />

      <AnalyzeButton
        onClick={handleAnalyze}
        disabled={!selectedFile || isLoading}
        isLoading={isLoading}
      />

      <AnalysisResult result={result} isLoading={isLoading} error={error} />
    </div>
  );
}
