import { cn } from "@/src/lib/utils";

interface Props {
  message?: string;
  className?: string;
}

export function FormError({ message, className }: Props) {
  if (!message) return null;

  return (
    <p className={cn("text-red-500 text-xs mt-2 font-medium", className)}>
      {message}
    </p>
  );
}
