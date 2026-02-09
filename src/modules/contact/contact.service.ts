import { CreateContactDTO } from "./contact.dto";
import { ContactRepository } from "./contact.reporitory";

export class ContactService {
  constructor(private readonly repository = new ContactRepository()) {}

  async createContact(dto: CreateContactDTO) {

    if (dto.number.length !== 9) {
      throw new Error("El número de teléfono debe tener 9 digitos");
    }

    return this.repository.createContact(dto);
  }
  
  async getContacs() {
    return this.repository.findAll();
  }

}
