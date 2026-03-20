import {
  // EXPORT -->
  // src/features/admin/intranet/components/LinkRow.tsx -- Para la eleccion de iconos
  Users,
  Settings,
  FileText,
  Link as LinkIcon, // Evitar errores de duplicacion con Link de next/navigation
  Shield,
  Database,

  //EXPORT -->
  // src/features/admin/intranet/components/form/IconPicker.tsx
  Briefcase,
  Calendar,
  HardDrive,
  Mail,
  Globe,
  MessageSquare,
  BarChart,
  HelpCircle,
  ExternalLink,
  Zap,
  Target,
  Eye,
  ShieldCheck,
  FileBarChart,
  Gavel,
  // Contabilidad General
  Calculator,
  ReceiptText,
  // Estados Financieros / Reportes
  LineChart,
  BarChart3,
  // Auditoria / Revisión
  BookOpenCheck,
  ClipboardList,
  Scale,
} from "lucide-react";

export const iconMap = {
  Users,
  Settings,
  FileText,
  BarChart3,
  LinkIcon,
  Shield,
  Database,
  Briefcase,
  Calendar,
  HardDrive,
  Mail,
  Globe,
  FileBarChart,
  Gavel,
  MessageSquare,
  BarChart,
  ClipboardList,
  HelpCircle,
  Zap,
  Target,
  Eye,
  ExternalLink,
  ShieldCheck,
  Calculator,
  ReceiptText,
  LineChart,
  BookOpenCheck,
  Scale,
};

export type IconName = keyof typeof iconMap;
