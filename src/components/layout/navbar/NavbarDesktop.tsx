"use client";

import Link from "next/link";
import { NAV_ITEMS } from "@/src/types/navigation-navbar/navigation";
import { hasChildren } from "./type";
import { NavbarDropdown } from "./NavbarDropdown";
import { hasHref } from "./type";

export function NavbarDesktop() {
  const centerItems = NAV_ITEMS.filter((i) => i.position !== "right");

  const rightItems = NAV_ITEMS.filter((i) => i.position === "right");

  return (
    <>
      {/* IZQUIERDA */}
      <Link href="/" className="text-2xl font-extrabold text-white mr-8">
        asescon
      </Link>

      {/* CENTRO */}
      <div className="hidden lg:flex items-center gap-6 text-white font-medium mx-auto">
        {centerItems.map((item) => {
          if (hasChildren(item)) {
            return <NavbarDropdown key={item.name} item={item} />;
          }

          if (hasHref(item)) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="hover:bg-blue-900/40 p-4 rounded-2xl transition-colors"
              >
                {item.name.toUpperCase()}
              </Link>
            );
          }

          return null;
        })}
      </div>

      {/* DERECHA */}
      <div className="hidden lg:flex items-center gap-4 text-white font-semibold ml-auto">
        {rightItems.map((item) => {
          if (!hasHref(item)) return null;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="hover:bg-blue-900/40 p-4 rounded-2xl"
            >
              {item.name.toUpperCase()}
            </Link>
          );
        })}
      </div>
    </>
  );
}
