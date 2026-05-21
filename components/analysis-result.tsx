"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy, Loader2, Wand2 } from "lucide-react";
import * as React from "react";

interface AnalysisResultProps {
  result: string | null;
  isLoading: boolean;
  error: string | null;
}

export function AnalysisResult(props: AnalysisResultProps) {
  const { result, isLoading, error } = props;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-6">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-sm font-medium text-foreground">
              Analyzing your design...
            </p>
            <p className="text-xs text-muted-foreground">
              This may take a few seconds
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Wand2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              No analysis yet
            </p>
            <p className="text-xs text-muted-foreground">
              Upload a design to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">
          Generated Prompt
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2 text-xs"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {result}
          </div>
        </div>
      </div>
    </div>
  );
}
