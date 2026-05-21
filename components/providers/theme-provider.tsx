"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // React 19 / Next.js 16 fix: suppress the <script> tag warning by
  // changing the type property passed to the next-themes script tag.
  const scriptProps = {
    type: "application/json",
  } as const;

  return (
    <NextThemesProvider {...props} scriptProps={scriptProps}>
      {children}
    </NextThemesProvider>
  );
}
