import { Loader2 } from "lucide-react";
interface LoadingStateProps {
  message?: string;
}
export function LoadingState({
  message = "Cargando registros...",
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3 text-gray-500">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
