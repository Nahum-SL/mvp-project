// src/features/admin/hooks/use-breadcrumbs.ts
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { formatBreadcrumbSegment } from "../utils/breadcrumb-map";

export interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo((): BreadcrumbItem[] => {
    const segments = pathname?.split("/").filter(Boolean) || [];

    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      const isLast = index === segments.length - 1;

      return {
        label: formatBreadcrumbSegment(segment),
        path,
        isLast,
      };
    });
  }, [pathname]);

  return { breadcrumbs, hasItems: breadcrumbs.length > 0 };
}
