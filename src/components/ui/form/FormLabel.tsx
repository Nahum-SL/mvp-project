interface Props {
  children: React.ReactNode;
}

export function FormLabel({
  children,
}: Props) {
  return (
    <label
      className="
        text-[10px]
        font-extrabold
        uppercase
        tracking-[0.2em]
        text-slate-400
      "
    >
      {children}
    </label>
  );
}