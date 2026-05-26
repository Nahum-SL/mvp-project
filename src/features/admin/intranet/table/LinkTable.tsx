"use client";

import { Table } from "@/src/components/ui/table/Table";
import type { IntranetLink } from "@/src/types/intranet/intranet-types";
// Componente
import { LinkRow } from "./LinkRow";

interface Props {
  links: IntranetLink[];
  isLoading?: boolean;
}

const headers = ["Orden", "Acceso", "Estado", "Acciones"];

export function LinkTable({ links, isLoading }: Props) {
  return (
    <Table headers={headers} isLoading={isLoading} isEmpty={!links.length}>
      {links.map((link) => (
        <LinkRow key={link.id} link={link} />
      ))}
    </Table>
  );
}
