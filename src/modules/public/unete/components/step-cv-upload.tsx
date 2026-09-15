"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Upload, FileText } from "lucide-react";
import type { UneteFormInput } from "../schemas/unete-public.schema";
import { FormError } from "@/src/components/ui/form/FormError";

export function StepCvUpload() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<UneteFormInput>();

  // Escuchamos los cambios del archivo localmente para actualizar la UI en tiempo real
  const cvFile = useWatch({ control, name: "cv" }) as FileList | undefined;
  const fileName = cvFile?.[0]?.name;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Adjunta tu CV (Solo formato PDF, máx. 5MB)
      </label>

      <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-400 bg-white rounded-2xl p-8 transition-all flex flex-col items-center justify-center cursor-pointer group">
        <input
          type="file"
          accept="application/pdf"
          {...register("cv")}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />

        {fileName ? (
          <div className="text-center space-y-2 pointer-events-none">
            <div className="mx-auto w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <FileText size={24} />
            </div>
            <p className="text-sm font-medium text-slate-800">{fileName}</p>
            <p className="text-xs text-blue-500 font-semibold">
              Haga clic o arrastre para cambiar el archivo
            </p>
          </div>
        ) : (
          <div className="text-center space-y-2 pointer-events-none">
            <div className="mx-auto w-12 h-12 bg-slate-50 group-hover:bg-blue-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-all">
              <Upload size={24} />
            </div>
            <p className="text-sm font-medium text-slate-600">
              Seleccionar un archivo PDF
            </p>
            <p className="text-xs text-slate-400">
              o arrástralo y suéltalo aquí
            </p>
          </div>
        )}
      </div>

      <FormError message={errors.cv?.message as string} />
    </div>
  );
}
