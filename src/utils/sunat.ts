export const getDynamicDeadline = (digit: string) => {
  if (!digit) return "Ingresa tu RUC";

  const now = new Date();
  const currentDay = now.getDate();
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const dayMapping: Record<string, number> = {
    "0": 15,
    "1": 16,
    "2": 17,
    "3": 18,
    "4": 19,
    "5": 20,
    "6": 21,
    "7": 22,
    "8": 23,
    "9": 24,
  };

  const scheduledDay = dayMapping[digit];
  let monthIndex = now.getMonth();

  // Lógica de "Próximo mes":
  // Si el día de hoy ya pasó el día programado, mostramos el del mes siguiente.
  if (currentDay > scheduledDay) {
    monthIndex = (monthIndex + 1) % 12;
  }

  return `${scheduledDay} de ${months[monthIndex]}`;
};
