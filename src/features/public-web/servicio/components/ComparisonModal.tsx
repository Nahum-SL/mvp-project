"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface ServiceMatrixItem {
  id: number;
  title: string;
  impact: number;
  effort: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceMatrixItem[];
}

export default function ComparisonModalPro({
  isOpen,
  onClose,
  services,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  //  zoom + pan
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  //  selección múltiple
  const [selected, setSelected] = useState<ServiceMatrixItem[]>([]);

  const toggleSelect = useCallback((svc: ServiceMatrixItem) => {
    setSelected((prev) => {
      const exists = prev.find((s) => s.id === svc.id);
      if (exists) return prev.filter((s) => s.id !== svc.id);
      return [...prev, svc].slice(0, 3); // max 3 (UX controlado)
    });
  }, []);

  //  zoom handlers
  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 2));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.6));

  //  drag
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;

    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;

    setTranslate((t) => ({ x: t.x + dx, y: t.y + dy }));

    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  //  memo puntos
  const points = useMemo(() => {
    return services.map((svc) => {
      const x = (svc.effort / 10) * 100;
      const y = 100 - (svc.impact / 10) * 100;

      const isBest = svc.impact >= 7 && svc.effort <= 4;

      return { ...svc, x, y, isBest };
    });
  }, [services]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* MAIN */}
          <div className="flex flex-1 items-center justify-center p-6 gap-6">
            {/* MATRIX */}
            <motion.div
              className="relative w-full max-w-5xl h-130 bg-white rounded-3xl border shadow-xl overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <div>
                  <h2 className="font-semibold">Análisis estratégico</h2>
                  <p className="text-xs text-slate-500">Impacto vs esfuerzo</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={zoomIn}
                    className="p-2 hover:bg-slate-100 rounded"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <button
                    onClick={zoomOut}
                    className="p-2 hover:bg-slate-100 rounded"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* CANVAS */}
              <div
                ref={containerRef}
                className="relative w-full h-full bg-slate-50 cursor-grab"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                    transformOrigin: "center",
                  }}
                >
                  {/* Axes */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-300" />

                  {/* Points */}
                  {points.map((p) => {
                    const isSelected = selected.find((s) => s.id === p.id);

                    return (
                      <div
                        key={p.id}
                        className="absolute group cursor-pointer"
                        style={{
                          left: `${p.x}%`,
                          top: `${p.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        onClick={() => toggleSelect(p)}
                      >
                        <div
                          className={`w-4 h-4 rounded-full transition ${
                            isSelected
                              ? "bg-indigo-600 scale-125"
                              : p.isBest
                                ? "bg-emerald-500"
                                : "bg-slate-700"
                          }`}
                        />

                        {/* Tooltip */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition">
                          <div className="bg-white border shadow px-3 py-2 rounded text-xs">
                            {p.title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>

            {/* SIDE PANEL */}
            <AnimatePresence>
              {selected.length > 0 && (
                <motion.div
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 40, opacity: 0 }}
                  className="w-[320px] bg-white rounded-2xl border shadow-lg p-5"
                >
                  <h3 className="font-semibold mb-4">Comparación</h3>

                  <div className="space-y-4">
                    {selected.map((s) => (
                      <div key={s.id} className="border rounded-xl p-3">
                        <p className="font-medium text-sm mb-2">{s.title}</p>

                        <div className="text-xs text-slate-600">
                          Impacto: {s.impact}
                        </div>
                        <div className="text-xs text-slate-600">
                          Esfuerzo: {s.effort}
                        </div>

                        <div className="mt-2 h-1 bg-slate-100 rounded">
                          <div
                            className="h-full bg-indigo-600"
                            style={{ width: `${s.impact * 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelected([])}
                    className="mt-4 text-xs text-slate-500 hover:text-slate-800"
                  >
                    Limpiar selección
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
