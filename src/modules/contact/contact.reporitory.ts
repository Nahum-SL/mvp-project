import { prisma } from "@/src/lib/prisma";
import { CreateContactDTO } from "./contact.dto";
import { ContactEntity } from "./contact.entity";

export class ContactRepository {
  async createContact(data: CreateContactDTO): Promise<ContactEntity> {
    return prisma.contact.create({
      data: {
        ...data,
        fechaNac: new Date(data.fechaNac),
      },
    });
  }

  async findAll(): Promise<ContactEntity[]> {
    return prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
}
