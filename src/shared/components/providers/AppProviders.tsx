"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { ErrorBoundary } from "../error";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProviderProps) {
  return (
    <QueryProvider>
      <ErrorBoundary>{children}</ErrorBoundary>
    </QueryProvider>
  );
}
