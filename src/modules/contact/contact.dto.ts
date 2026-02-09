export interface CreateContactDTO {
  name: string;
  email: string;
  number: string;
  fechaNac: Date;
  comment?: string;
}