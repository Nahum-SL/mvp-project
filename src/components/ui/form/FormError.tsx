interface Props {
  message?: string;
}

export function FormError({
  message,
}: Props) {
  if (!message) return null;

  return (
    <p className="text-red-500 text-xs mt-2 font-medium">
      {message}
    </p>
  );
}