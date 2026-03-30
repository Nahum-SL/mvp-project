// emails/TwoFactorEmail.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export const TwoFactorEmail = ({ code }: { code: string }) => (
  <Html>
    <Head />
    <Preview>Tu código de acceso a ASESCON</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>ASESCON</Text>
        <Heading style={h1}>Verificación de Identidad</Heading>
        <Text style={text}>
          Se ha detectado un intento de inicio de sesión en el panel
          administrativo. Usa el siguiente código para completar el acceso:
        </Text>
        <Section style={codeBox}>
          <Text style={codeText}>{code}</Text>
        </Section>
        <Text style={footer}>
          Este código expira en 5 minutos. Si no has sido tú, ignora este
          mensaje y contacta a soporte técnico de inmediato.
        </Text>
      </Container>
    </Body>
  </Html>
);

// Estilos que emulan tu Dashboard Dark
const main = {
  backgroundColor: "#020617", // Slate 950
  fontFamily: "serif",
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
};

const brand = {
  color: "#38bdf8", // Sky 400
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  letterSpacing: "3px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "800",
  textAlign: "center" as const,
  margin: "30px 0",
};

const text = {
  color: "#94a3b8", // Slate 400
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "center" as const,
};

const codeBox = {
  background: "rgba(30, 41, 59, 0.5)", // Slate 900/50
  borderRadius: "20px",
  border: "1px solid #1e293b",
  padding: "30px",
  margin: "30px 0",
  textAlign: "center" as const,
};

const codeText = {
  color: "#38bdf8",
  fontSize: "40px",
  fontWeight: "bold",
  letterSpacing: "10px",
  margin: "0",
};

const footer = {
  color: "#475569",
  fontSize: "12px",
  fontStyle: "italic",
  textAlign: "center" as const,
};
