// src/hooks/usePersistedState.ts
"use client";

import { useSyncExternalStore, useCallback } from "react";

export function usePersistedState<T>(key: string, defaultValue: T) {
  // 1. Suscriptor: Escucha cambios en otras pestañas o dispatch manual
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  }, []);

  // 2. Lector del Cliente (Snapshot)
  const getClientSnapshot = () => {
    const saved = localStorage.getItem(key);
    return saved !== null ? saved : JSON.stringify(defaultValue);
  };

  // 3. Lector del Servidor (Previene errores de hidratación)
  const getServerSnapshot = () => JSON.stringify(defaultValue);

  // Sincronizamos con el Store Externo (localStorage)
  const rawState = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  // 4. Función para actualizar (Setter)
  const setState = (value: T | ((prev: T) => T)) => {
    try {
      const currentState = JSON.parse(rawState);
      const valueToStore =
        value instanceof Function ? value(currentState) : value;

      localStorage.setItem(key, JSON.stringify(valueToStore));

      // IMPORTANTE: Disparamos un evento manual para que useSyncExternalStore
      // se entere del cambio en la misma pestaña inmediatamente.
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };

  return [JSON.parse(rawState) as T, setState] as const;
}
