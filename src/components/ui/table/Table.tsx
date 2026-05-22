import { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface TableProps {
  headers: string[];
  children: ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  loadingComponent?: ReactNode;
  emptyComponent?: ReactNode;
}

export function Table({
  headers,
  children,
  isLoading,
  isEmpty,
  loadingComponent,
  emptyComponent,
}: TableProps) {
  const colSpan = headers.length;
  return (
    <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm bg-white dark:bg-gray-900">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/50 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
            {headers.map((header, index) => (
              <th
                key={header}
                className={cn(
                  "px-6 py-3.5",
                  index === colSpan - 1 ? "text-right" : "",
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm">
          {isLoading && (
            <tr>
              <td colSpan={colSpan} className="px-6 py-4">
                {loadingComponent}
              </td>
            </tr>
          )}
          {!isLoading && isEmpty && (
            <tr>
              <td colSpan={colSpan} className="px-6 py-4">
                {emptyComponent}
              </td>
            </tr>
          )}
          {!isLoading && !isEmpty && children}
        </tbody>
      </table>
    </div>
  );
}
