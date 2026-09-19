// src/shared/components/form/ImagePicker.tsx
"use client";

// Iconos
import { ImageIcon, X } from "lucide-react";
// React
import { useRef } from "react";
import { useFormContext, FieldValues, Path, PathValue } from "react-hook-form";
// Next
import Image from "next/image";
// Framer Motion
import { motion, AnimatePresence } from "framer-motion";
// Util para manejar cambios css
import { cn } from "@/src/lib/utils";

// Definimos la interfaz usando el genérico TFieldValues para que sea Type-safe
interface ImagePickerProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>; // El campo exacto del esquema (ej: "image")
  previewUrl: string | null;
  onImageChange: (file: File | null) => void;
  onRemove: () => void;
  disabled?: boolean;
  label?: string; // Label opcional por si cambia el texto
}

export function ImagePicker<TFieldValues extends FieldValues = FieldValues>({
  name,
  previewUrl,
  onImageChange,
  onRemove,
  disabled = false,
  label = "Portada",
}: ImagePickerProps<TFieldValues>) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extraemos setValue y register tipados desde el contexto
  // Se corrigio el problema de como manejaba RHF la imagen
  // Mostrando FileList { length: 0 } 
  // El problema estaba justo en la interacción entre el register() del <input type="file"> y tu setValue().
  const { setValue } = useFormContext<TFieldValues>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    console.log("📸 FILE SELECCIONADO:", file);
    console.log("📸 INSTANCE OF FILE:", file instanceof File);

    // 1. Notificamos al hook local para renderizar el ObjectURL en la vista
    onImageChange(file);

    // 2. Sincronizamos dinámicamente con el nombre de propiedad recibido
    setValue(name, file as PathValue<TFieldValues, Path<TFieldValues>>, {
      shouldValidate: true,
    });
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previene activar el clic del contenedor padre
    onRemove();

    // Al remover, seteamos el campo como undefined o null
    setValue(name, undefined as PathValue<TFieldValues, Path<TFieldValues>>, {
      shouldValidate: true,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpiamos el valor nativo del input HTML
    }
  };

  return (
    <section>
      <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 mb-4 block">
        {label}
      </label>
      <div
        onClick={() => !previewUrl && fileInputRef.current?.click()}
        className={cn(
          `relative aspect-4/3 rounded-4xl border-2 transition-all cursor-pointer
          overflow-hidden flex flex-col items-center justify-center group`,
          previewUrl
            ? "border-transparent"
            : "border-slate-200 hover:border-cyan-400 bg-slate-50 hover:-translate-y-1 hover:shadow-2xl",
          disabled && "opacity-50 pointer-events-none",
        )}
      >
        <AnimatePresence mode="wait">
          {previewUrl ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full"
            >
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                unoptimized={previewUrl.startsWith("blob:")}
              />
              <button
                type="button"
                onClick={handleRemoveClick}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
              >
                <X size={16} />
              </button>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="p-4 bg-white rounded-full shadow-sm mb-3 text-slate-400 group-hover:text-blue-600 transition-colors">
                <ImageIcon size={24} />
              </div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-tighter">
                Seleccionar Archivo
              </span>
            </div>
          )}
        </AnimatePresence>

        {/* 
          Input oculto unificado con RHF de forma segura 
          Ahora simplemente le enviamos ref={fileInputRef}
        */}
        <input
          ref={fileInputRef}          
          type="file"
          className="hidden"
          accept="image/jpeg, image/png, image/webp"
          onChange={handleFileChange}
          disabled={disabled}
        />
      </div>
    </section>
  );
}
