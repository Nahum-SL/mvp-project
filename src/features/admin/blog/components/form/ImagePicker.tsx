// src/features/admin/blog/components/form/ImagePicker.tsx
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface ImagePickerProps {
  previewUrl: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  disabled: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>; // Fix: permitimos null
}

export const ImagePicker = ({
  previewUrl,
  onImageChange,
  onRemove,
  disabled,
  fileInputRef,
}: ImagePickerProps) => (
  <section>
    <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 mb-4 block">
      Portada
    </label>
    <div
      className={cn(
        `relative aspect-4/3 rounded-4xl border-2 transition-all 
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
            className="relative w-full h-full"
          >
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg"
            >
              <X size={16} />
            </button>
          </motion.div>
        ) : (
          <div
            className="contents"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="p-4 bg-white rounded-full shadow-sm mb-3 text-slate-400 group-hover:text-blue-600">
              <ImageIcon size={24} />
            </div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-tighter">
              Seleccionar Archivo
            </span>
          </div>
        )}
      </AnimatePresence>
      <input
        ref={fileInputRef}
        type="file"
        name="image"
        className="hidden"
        accept="image/*"
        onChange={onImageChange}
      />
    </div>
  </section>
);
