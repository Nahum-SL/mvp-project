// src/features/admin/contacto/store/contacto.selector.ts
import { useContactoStore } from "./contacto.store";

// Selector para los filtros de la tabla/búsqueda
export const useContactFilters = () =>
  useContactoStore((state) => state.filters);

// Selector para controlar el estado del modal de eliminación
export const useContactDeleteModal = () =>
  useContactoStore((state) => state.deleteModal);

// Selector para obtener el contacto activo (para ver detalles en un modal/drawer)
export const useActiveContact = () =>
  useContactoStore((state) => state.activeContact);

// Selector único para todas las acciones del store (al ser estáticas, se desestructuran de forma segura)
export const useContactActions = () =>
  useContactoStore((state) => state.actions);
