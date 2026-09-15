"use client";
import { SERVICES_PROCESS_STEPS } from "../utils/steps-process";

export default function ServiceProcess() {
  return (
    <section className="py-32 bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-serif mb-20">
          Un proceso claro <br/> sin fricción
        </h2>

        {/* Grid editorial */}
        <div className="grid md:grid-cols-2 border-t border-slate-800">
          {SERVICES_PROCESS_STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`
                py-10 pr-8
                border-b border-slate-800
                ${i % 2 === 0 ? "md:border-r md:pr-12" : "md:pl-12"}
              `}
            >
              <div className="space-y-4">
                {/* Number */}
                <span className="text-sm text-slate-500 tracking-widest">
                  {step.number}
                </span>

                {/* Title */}
                <h3 className="text-xl font-medium text-white">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
