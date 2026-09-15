"use client";

import { Dispatch, SetStateAction } from "react";
import { GratificationInput } from "../types";

interface Props {
  value: GratificationInput;
  onChange: Dispatch<SetStateAction<GratificationInput>>;
}

export function GratificationForm({ value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-slate-400">Sueldo</label>
        <input
          type="number"
          value={value.salary || ""}
          onChange={(e) =>
            onChange((prev) => ({
              ...prev,
              salary: Number(e.target.value),
            }))
          }
          className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
        />
      </div>

      <div>
        <label className="text-xs text-slate-400">Meses</label>
        <select
          value={value.months}
          onChange={(e) =>
            onChange((prev) => ({
              ...prev,
              months: Number(e.target.value),
            }))
          }
          className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
        >
          {[6, 5, 4, 3, 2, 1].map((m) => (
            <option key={m} value={m}>
              {m} meses
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
