"use client";
import RevealOnScroll from "../animations/RevealOnScroll";

interface CardProps {
  title: string;
  subtitle: string;
}

export default function CardTitle({ title, subtitle }: CardProps) {
  return (
    <RevealOnScroll>
      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <header className="bg-blue-800 text-center py-20 px-8 rounded-lg shadow-lg w-full">
          <h2 className="text-6xl sm:text5xl md:text-6xl font-bold text-gray-100">
            {title}
          </h2>
          <p className="mt-8 text-base font-semibold sm:text-lg text-gray-100">
            {subtitle}
          </p>
        </header>
      </div>
    </RevealOnScroll>
  );
}