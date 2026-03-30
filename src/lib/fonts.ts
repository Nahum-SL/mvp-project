import { Raleway, Inter } from "next/font/google";

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"], // 👈 evita 900
  display: "swap",
  preload: true, // 👈 carga prioritaria para evitar FOIT
});
