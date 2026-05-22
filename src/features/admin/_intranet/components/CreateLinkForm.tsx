"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";


import {
  intranetLinkSchema,
  type IntranetLinkValues,
  type IntranetLinkFormInput,
} from "../schema";
// Acciones ( CREATE / UPDATE )
import { createLinkAction, updateLinkAction } from "../action";
import { LinkHeader } from "./form/LinkHeader";
import { LinkConfigCard } from "./form/LinkConfigCard";
import { IntranetLink } from "@/src/types/intranet/intranet-types";
// Iconos
import { IconPicker } from "./form/IconPicker";
import { IconName } from "@/src/lib/icons";
interface Props {
  initialData?: IntranetLink;
}

export const CreateLinkForm = ({ initialData }: Props) => {
  const isEditing = !!initialData;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Estado local para el icono
  const [selectedIcon, setSelectedIcon] = useState<IconName>(
    (initialData?.icon as IconName) || "Link",
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IntranetLinkFormInput, unknown, IntranetLinkValues>({
    resolver: zodResolver(intranetLinkSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      url: initialData?.url || "",
      icon: initialData?.icon || "Link",
      order: initialData?.order || 0,
      isVisible: initialData?.isVisible || true,
    },
  });

  // Sincronizar selección de icono con Hook Form
  const handleIconChange = (iconName: IconName) => {
    setSelectedIcon(iconName);
    setValue("icon", iconName, { shouldValidate: true });
  };

  const onSubmit = async (data: IntranetLinkValues) => {
    startTransition(async () => {
      // Si es edición, necesitamos el ID
      const result =
        isEditing && initialData
          ? await updateLinkAction(initialData.id, data)
          : await createLinkAction(data);

      if (result.success) {
        toast.success(isEditing ? "¡Acceso actualizado!" : "¡Acceso creado!");
        router.push("/admin/intranet");
      } else {
        toast.error(result.error || "Error al procesar la solicitud");
      }
    });
  };

  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20"
    >
      {/* Columna Principal: Header e IconPicker */}
      <div className="lg:col-span-2 space-y-8">
        <LinkHeader register={register} errors={errors} disabled={isPending} />

        <div
          className={
            isPending ? "opacity-50 pointer-events-none transition-opacity" : ""
          }
        >
          <IconPicker
            value={selectedIcon}
            onChange={handleIconChange}
            error={errors.icon?.message}
          />
        </div>
      </div>

      {/* Columna Lateral: Configuración y Acciones */}
      <div className="space-y-6">
        <LinkConfigCard
          register={register}
          errors={errors}
          isPending={isPending}
        />

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
            text-white font-extrabold py-4 rounded-2xl shadow-xl shadow-blue-200 
            transition-all flex items-center justify-center gap-3 uppercase text-sm tracking-widest"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            {isPending
              ? "Guardando..."
              : isEditing
                ? "Actualizar"
                : "Crear Acceso"}
          </button>

          <Link
            href="/admin/intranet"
            className="w-full bg-white text-slate-500 font-bold py-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest text-center"
          >
            <ArrowLeft size={16} /> Cancelar
          </Link>
        </div>
      </div>
    </form>
  );
};
