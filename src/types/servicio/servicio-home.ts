// Export --> ServiceCardHome.tsx
// Para mostrar sercicios en el home
import { IconName } from "@/src/lib/icons";

export interface ServiceHome {
  id: number;
  title: string;
  description: string;
  icon: IconName;
  slug: string;
}
