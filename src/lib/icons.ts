import {
  // EXPORT -->
  // src/features/admin/intranet/components/LinkRow.tsx -- Para la eleccion de iconos
  Users,
  Settings,
  FileText,
  BarChart3,
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
  ClipboardList,
  HelpCircle,
  ExternalLink,
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
  MessageSquare,
  BarChart,
  ClipboardList,
  HelpCircle,
  ExternalLink,
};

export type IconName = keyof typeof iconMap;
