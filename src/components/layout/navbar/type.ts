// type.ts
import { LucideIcon } from "lucide-react";

export type NavItem =
  | {
      name: string;
      href: string;
      icon?: LucideIcon;
      description?: string;
      children?: never;
      position?: string;
    }
  | {
      name: string;
      icon?: LucideIcon;
      description?: string;
      children: {
        name: string;
        href: string;
        description?: string;
        position?: string;
      }[];
      href?: never;
      position?: string;
    };

export type NavItemWithChildren = Extract<NavItem, { children: unknown }>;

// helper type-safe
export function hasChildren(item: NavItem): item is NavItemWithChildren {
  return "children" in item;
}

export function hasHref(
  item: NavItem,
): item is Extract<NavItem, { href: string }> {
  return "href" in item;
}
