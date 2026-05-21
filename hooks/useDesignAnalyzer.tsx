"use client";

import { SYSTEM_PROMPT } from "@/constant";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import * as React from "react";
import { toast } from "sonner"; // 1. Imported the sonner toast instance

export function useDesignAnalyzer() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileSelect = React.useCallback(
    (file: File | null) => {
      setSelectedFile(file);
      setResult(null);
      setError(null);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    },
    [previewUrl]
  );

  const handleAnalyze = React.useCallback(async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const base64 = await fileToBase64(selectedFile);

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_KEY;
      if (!apiKey) {
        throw new Error("API key 'NEXT_PUBLIC_GOOGLE_AI_KEY' is missing.");
      }

      const googleProvider = createGoogleGenerativeAI({ apiKey });
      const promptText = `${SYSTEM_PROMPT}\n\nPlease analyze the following design and generate a comprehensive implementation prompt:`;

      const response = await generateText({
        model: googleProvider("gemini-2.5-flash"),
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: promptText },
              {
                type: "image",
                image: `data:${selectedFile.type};base64,${base64}`,
              },
            ],
          },
        ],
      });

      setResult(response.text);
    } catch (err: any) {
      console.error("Gemini API Error:", err);

      const errorMessage = err?.message || String(err);

      // Check if the error is due to country/location restrictions
      if (
        errorMessage.includes("User location is not supported") ||
        errorMessage.includes("FAILED_PRECONDITION") ||
        err?.status === 400
      ) {
        const customAlertMessage =
          "Sorry, Access Restricted. Access to this application from your country is restricted. Please consider using a VPN to access.";

        toast.error("Network Error", {
          description: customAlertMessage,
          duration: 6000,
        });

        setError(
          "Network Error: Access restricted from your current country location."
        );
      } else {
        const fallbackMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        toast.error("Analysis Failed", { description: fallbackMessage });
        setError(fallbackMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return {
    selectedFile,
    previewUrl,
    result,
    isLoading,
    error,
    handleFileSelect,
    handleAnalyze,
  };
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result as string;
      const base64 = res.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
