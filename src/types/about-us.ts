import { AboutUs } from "../data/about-us";

// Exportado --> src/app/components/ui/layout/AboutSection.tsx 
export const aboutUs: AboutUs[] = [
  {
    title: "¿Quienes Somos?",
    description: `
      Nuestra firma está conformada por un grupo humano de primer nivel con más de 30 años de experiencia 
      en el rubro del asesoramiento contable, laboral, tributario y financiero, especializados en proporcionar 
      soluciones para cumplir y superar las expectativas de nuestros clientes. ASESCON brinda una amplia gama de 
      servicios orientados a mejorar el funcionamiento empresarial, proporcionando un respaldo sólido en el 
      cumplimiento de sus obligaciones fiscales y legales.
    `,
    history: [
        { 
          id: 1,
          text: "Años de Experiencia",
          number: 30
        },
        {
          id: 2,
          text: "Clientes Satisfechos",
          number: 700
        },
        {
          id: 3,
          text: "Areas de producción",
          number: 20
        },
        {
          id: 4,
          text: "De casos resueltos",
          number: 90
        }
    ]
  },
];
