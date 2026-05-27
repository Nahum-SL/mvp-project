import { cn } from "@/src/lib/utils";

type typeButton = "button" | "submit" | "reset";
type variantButton = "default" | "danger";

interface TableButtonProps {
  type?: typeButton;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  title: string;
  variant?: variantButton;
}

export const TableButton = ({
  type = "button",
  onClick,
  className,
  children,
  title,
  variant = "default"
}: TableButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-xl transition-all",
        variant === "danger" && "hover:text-red-500 hover:bg-red-50 dark:hover:bg-gray-800",
        className,
      )}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};
