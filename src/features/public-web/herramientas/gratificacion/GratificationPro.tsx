"use client";

import { useState } from "react";
import { GratificationForm } from "./GratificationForm";
import { GratificationResult } from "./GratificationResult";
import { GratificationBreakdown } from "./GratificacitonBreakdown";
import { GratificationActions } from "./GratificationAcions";
import { useGratification } from "../hooks/useGratification";
import { GratificationInput } from "../types";

export default function GratificationPro() {
  const [input, setInput] = useState<GratificationInput>({
    salary: 0,
    months: 6,
  });

  const result = useGratification(input);

  return (
    <div className="max-w-md mx-auto bg-slate-950 p-6 rounded-3xl border border-slate-800">
      <GratificationForm value={input} onChange={setInput} />

      <div className="my-6">
        <GratificationResult result={result} />
      </div>

      <GratificationBreakdown result={result} />

      <GratificationActions total={result.total} />
    </div>
  );
}
