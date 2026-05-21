"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

interface AnalyzeButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

export function AnalyzeButton(props: AnalyzeButtonProps) {
  const { onClick, disabled, isLoading } = props;
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="h-12 w-full gap-2 text-base font-medium"
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Analyze Design
        </>
      )}
    </Button>
  );
}
