"use client";

import { useMemo } from "react";
import { calculateGratification } from "../utils/gratification";
import { GratificationInput } from "../types";

export function useGratification(input: GratificationInput) {
  const result = useMemo(() => {
    return calculateGratification(input);
  }, [input]);

  return result;
}
