export type GratificationInput = {
  salary: number;
  months: number;
};

export type GratificationResult = {
  base: number;
  bonus: number;
  total: number;
};

export type GratificationBreakdownItem = {
  label: string;
  value: number;
};
