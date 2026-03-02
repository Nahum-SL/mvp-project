import UneteHeader from "@/src/components/ui/layout/UneteHeader"
import UneteForm from "@/src/features/UneteForm"

// Se reformara esta exibicion de la data
export default function JoinUsPage() {
  return (
    <main>
      <UneteHeader title="Forma parte de nuestra historia" subtitle="Talento que inspira" src="/unete-header.webp" alt="Tenemos un espacio para ti"/>
      <UneteForm title="Dejanos tus datos" subtitle="¡Te contactaremos pronto!" src="/trabaja-con-nosotros.webp" alt="Dejanos tus datos"/>
    </main>
  )
}