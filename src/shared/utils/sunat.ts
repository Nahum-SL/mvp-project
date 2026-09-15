// utils/sunat.ts
type Schedule = Record<string, number>;

const SCHEDULE: Schedule = {
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

export const getDynamicDeadline = (digit: string, now: Date) => {
  if (!digit || !(digit in SCHEDULE)) {
    return "Ingresa tu RUC";
  }

  const { day: currentDay, month } = {
    day: now.getDate(),
    month: now.getMonth(),
  };

  const scheduledDay = SCHEDULE[digit];

  let monthIndex = month;

  if (currentDay > scheduledDay) {
    monthIndex = (monthIndex + 1) % 12;
  }

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

  return `${scheduledDay} de ${months[monthIndex]}`;
};
