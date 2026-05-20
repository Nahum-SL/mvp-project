"use client";

import { useEffect, useRef } from "react";

import {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { slugify } from "@/src/lib/utils";

// 1. Forzamos a que T herede de FieldValues para satisfacer a RHF
interface Props<T extends FieldValues> {
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  fieldTitle: Path<T>;
  fieldSlug: Path<T>;
  disabled?: boolean;
}

export function useAutoSlug<T extends FieldValues>({
  control,
  setValue,
  fieldTitle,
  fieldSlug,
  disabled,
}: Props<T>) {
  const manuallyEdited = useRef(false);

  const watchedTitle = useWatch({
    control,
    name: fieldTitle,
  });

  useEffect(() => {
    if (disabled || !watchedTitle || manuallyEdited.current) {
      return;
    }

    setValue(
      fieldSlug,
      slugify(String(watchedTitle)) as PathValue<T, Path<T>>,
      {
        shouldValidate: true,
      },
    );
  }, [watchedTitle, disabled, fieldSlug, setValue]);

  const markAsManual = () => {
    manuallyEdited.current = true;
  };

  return {
    markAsManual,
  };
}
