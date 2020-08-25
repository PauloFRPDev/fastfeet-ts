import AppError from '../errors/AppError';

import Recipient from '../models/Recipient';

interface RequestData {
  recipient_id: number;
  name: string;
  street: string;
  number: number;
  complement?: string;
  state: string;
  city: string;
  cep: string;
}

export default class UpdateRecipientService {
  public async execute({
    recipient_id,
    name,
    street,
    number,
    complement,
    state,
    city,
    cep,
  }: RequestData): Promise<Recipient> {
    const recipient = await Recipient.findOne(recipient_id);

    if (!recipient) {
      throw new AppError('Recipient not found');
    }

    recipient.name = name;
    recipient.street = street;
    recipient.number = number;
    recipient.complement = complement as string;
    recipient.state = state;
    recipient.city = city;
    recipient.cep = cep;

    recipient.save();

    return recipient;
  }
}
