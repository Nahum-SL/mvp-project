export const formDate = (data: string | Date): string => {
  return new Intl.DateTimeFormat("es-Es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(data));
};

export const formatCurrency = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
