import Recipient from '../models/Recipient';

interface RequestData {
  name: string;
  street: string;
  number: number;
  complement?: string;
  state: string;
  city: string;
  cep: string;
}

export default class CreateRecipientService {
  public async execute({
    name,
    street,
    number,
    complement,
    state,
    city,
    cep,
  }: RequestData): Promise<Recipient> {
    const recipient = Recipient.create({
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });

    await recipient.save();

    return recipient;
  }
}
