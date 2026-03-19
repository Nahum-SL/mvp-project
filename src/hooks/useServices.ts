// src/hooks/useServices.ts
// Este hook centralizará la lógica de fetching,
// el manejo de errores y los estados de carga,
// asegurando que el ServiceDashboard sepa exactamente
// cuándo mostrar el Skeleton.

"use client";

import { useState, useEffect } from "react";
import { Service } from "@/src/types/servicio/servicio";

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEST_API_URL || "http://localhost:3001";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        // Consumimos la ruta pública de tu controlador de NestJS
        const response = await fetch(`${API_URL}/servicio`, {
          // Usamos caché de Next.js pero permitimos revalidación
          next: { tags: ["servicio"] },
        });

        if (!response.ok) {
          throw new Error("Error al cargar los servicios");
        }

        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        console.error("FETCH_SERVICES_ERROR:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [API_URL]);

  return { services, isLoading, error };
};
