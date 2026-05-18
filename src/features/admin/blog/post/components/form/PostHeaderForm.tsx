import { slugify } from "@/src/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "@/src/components/ui/form/FormLabel";
import { FormInput } from "@/src/components/ui/form/FormInput";
import { FormTextArea } from "@/src/components/ui/form/FormTextArea";
import { FormError } from "@/src/components/ui/form/FormError";
import { FormCheckbox } from "@/src/components/ui/form/FormCheckbox";

interface PostHeaderProps {
  disabled?: boolean;
  onSlugManualEdit: () => void;
}

interface PostHeaderProps {
  disabled?: boolean;
  onSlugManualEdit: () => void;
}

export const PostHeaderForm = ({
  disabled,
  onSlugManualEdit,
}: PostHeaderProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      {/* TITLE */}
      <div>
        <FormInput
          name="title"
          variant="title"
          disabled={disabled}
          placeholder="Título impactante del post..."
        />
        <FormError message={errors.title?.message as string} />
      </div>

      {/* SLUG */}
      <div className="space-y-2">
        <FormLabel>URL del artículo</FormLabel>
        <div className="flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-amber-300 focus-within:ring-2 focus-within:ring-blue-100">
          <span className="text-slate-400 text-sm mr-2 hidden md:block">
            /blog/
          </span>
          <input
            {...register("slug", {
              onChange: (e) => {
                onSlugManualEdit();
                setValue("slug", slugify(e.target.value));
              },
            })}
            disabled={disabled}
            className="w-full bg-transparent outline-none text-sm font-semibold text-slate-700 font-mono"
            placeholder="mi-articulo"
          />
        </div>
        <FormError message={errors.slug?.message as string} />
      </div>

      {/* EXCERPT */}
      <FormTextArea
        name="excerpt"
        disabled={disabled}
        placeholder="Resumen ejecutivo para SEO..."
      />

      {/* PUBLISHED CONTROL (Checkbox atómico) */}
      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        <FormCheckbox
          name="published"
          label="Publicar inmediatamente (Marcar como visible para los lectores)"
          disabled={disabled}
        />
      </div>
    </div>
  );
};
