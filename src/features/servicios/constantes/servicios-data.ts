// src/features/servicios/constants/servicios_data.ts

export const BUSINESS_TYPES = [
  { id: 'mype', label: 'MYPE / Emprendedor', icon: 'Store' },
  { id: 'startup', label: 'Startup Tech', icon: 'Rocket' },
  { id: 'corporativo', label: 'Gran Empresa', icon: 'Building2' },
];

export const PAIN_POINTS = [
  { id: 'impuestos', label: 'Carga de Impuestos', icon: 'FileText' },
  { id: 'planillas', label: 'Gestión de Planillas', icon: 'Users' },
  { id: 'legal', label: 'Cumplimiento Legal', icon: 'Gavel' },
  { id: 'estrategia', label: 'Crecimiento y Estrategia', icon: 'TrendingUp' },
];

export const SERVICIOS = [
  {
    id: 'outsourcing',
    title: 'Outsourcing Contable',
    description: 'Gestión integral de tu contabilidad mensual y anual.',
    relevancia: ['mype', 'startup', 'impuestos'],
    features: ['Declaración PDT', 'Libros Electrónicos', 'Balance General']
  },
  {
    id: 'asesoria_financiera',
    title: 'Asesoría Financiera',
    description: 'Optimización de recursos y flujo de caja para crecimiento.',
    relevancia: ['corporativo', 'startup', 'estrategia'],
    features: ['Estructura de costos', 'Análisis de rentabilidad', 'Proyecciones']
  },
  {
    id: 'outsourcing_planillas',
    title: 'Outsourcing de Planillas',
    description: 'Cálculo exacto de beneficios sociales y PLAME.',
    relevancia: ['corporativo', 'planillas'],
    features: ['Boletas de pago', 'Liquidaciones', 'T-Registro']
  }
];