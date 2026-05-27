import { cn } from "@/src/lib/utils";

type typeButton = "button" | "submit" | "reset";

interface TableButtonProps {
  type?: typeButton;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  title: string;
}

export const TableButton = ({
  type = "button",
  onClick,
  className,
  children,
  title,
}: TableButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-xl transition-all",
        className,
      )}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};
