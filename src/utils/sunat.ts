type MonthSchedule = {
  month: number; // 0-11
  year: number;
  schedule: Record<string, number>;
};

export const getCurrentSchedule = (): MonthSchedule => ({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  schedule: {
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
  },
});

export const getDynamicDeadline = (digit: string) => {
  const now = new Date();
  const currentDay = now.getDate();

  const { schedule, month } = getCurrentSchedule();

  const scheduledDay = schedule[digit];

  let monthIndex = month;

  if (currentDay > scheduledDay) {
    monthIndex = (monthIndex + 1) % 12;
  }

  if (!digit || !(digit in schedule)) return "Ingresa tu RUC";

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
