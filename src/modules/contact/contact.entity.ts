export interface ContactEntity {
  id: number;
  name: string;
  email: string;
  number: string;
  fechaNac: Date;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
}
