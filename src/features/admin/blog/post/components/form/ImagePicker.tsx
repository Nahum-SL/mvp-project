// src/features/admin/blog/components/form/ImagePicker.tsx
"use client";

import { useRef } from "react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { useFormContext } from "react-hook-form";

interface ImagePickerProps {
  previewUrl: string | null;
  onImageChange: (file: File | null) => void; // Recibe el archivo directamente
  onRemove: () => void;
  disabled: boolean;
}

export const ImagePicker = ({
  previewUrl,
  onImageChange,
  onRemove,
  disabled,
}: ImagePickerProps) => {
  // Encapsulamos la referencia del input dentro de su propio componente
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Obtenemos setValue desde React Hook Form para sincronizar el archivo binario con el Schema
  const { setValue, register } = useFormContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    // 1. Enviamos el archivo al hook de preview para renderizar la imagen
    onImageChange(file);
    
    // 2. Sincronizamos el archivo con React Hook Form para que Zod lo valide
    setValue("image", file, { shouldValidate: true });
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitamos que el click active el contenedor padre
    onRemove();
    setValue("image", null, { shouldValidate: true });
    if (fileInputRef.current) fileInputRef.current.value = ""; // Limpiamos el value HTML
  };

  return (
    <section>
      <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 mb-4 block">
        Portada
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
                unoptimized={previewUrl.startsWith("blob:")} // Evita optimizar URLs temporales
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

        {/* El input oculto se registra con RHF de forma nativa */}
        <input
          {...register("image")}
          ref={(e) => {
            register("image").ref(e); // Registra el ref de RHF
            fileInputRef.current = e; // Sincroniza nuestro ref local para el clic
          }}
          type="file"
          className="hidden"
          accept="image/jpeg, image/png, image/webp"
          onChange={handleFileChange}
          disabled={disabled}
        />
      </div>
    </section>
  );
};