// features/public-pages/unete/components/FileUpload.tsx
import { FaCloudUploadAlt } from "react-icons/fa";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/src/lib/utils";

interface FileUploadProps {
  label: string;
  selectedFileName?: string;
  registration: UseFormRegisterReturn;
  error?: string;
}

export const FileUpload = ({
  label,
  selectedFileName,
  registration,
  error,
}: FileUploadProps) => {
  return (
    <div className="md:col-span-2 space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
        {label}
      </label>
      <div className="relative group cursor-pointer">
        <input
          type="file"
          accept=".pdf"
          {...registration}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div
          className={cn(
            "w-full border-2 border-dashed",
            error ? "border-red-300 bg-red-50/10" : "border-slate-200 bg-white",
            "p-6 rounded-xl flex flex-col items-center justify-center group-hover:border-blue-500 transition-colors",
          )}
        >
          <FaCloudUploadAlt
            className={cn(
              "text-3xl mb-2 transition-colors",
              error ? "text-red-300" : "text-slate-300",
              "group-hover:text-blue-500",
            )}
          />
          <span className="text-sm text-slate-500 font-medium text-center">
            {selectedFileName || "Seleccione Archivo o arrastre aquí"}
          </span>
        </div>
      </div>
      {error && <p className="text-red-500 text-[10px]">{error}</p>}
    </div>
  );
};
