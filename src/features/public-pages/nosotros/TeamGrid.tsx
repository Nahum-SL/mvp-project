// src/features/public-pages/about/components/TeamGrid.tsx
import { TeamMember } from "@/src/types/nosotros/team-asescon";
import { TeamMemberCard } from "./TeamMemberCard";

export const TeamGrid = ({ members }: { members: TeamMember[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {members.map((member, index) => (
        // Usamos el index para el delay condicional si queremos,
        // pero whileInView ya maneja el scroll.
        <TeamMemberCard key={member.id} member={member} index={index + 1}/>
      ))}
    </div>
  );
};
