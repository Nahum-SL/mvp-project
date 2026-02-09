import { NextResponse } from "next/server";
import { ContactService } from "@/src/modules/contact/contact.service";

const service = new ContactService();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const contact = await service.createContact(body);

    return NextResponse.json(contact, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const contacts = await service.getContacs();
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json(
      { message: "Error al obtener los contactos" },
      { status: 500 },
    );
  }
}
