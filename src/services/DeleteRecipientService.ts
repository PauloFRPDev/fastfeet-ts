import AppError from '../errors/AppError';

import Recipient from '../models/Recipient';

interface RequestData {
  recipient_id: number;
}

export default class DeleteRecipientService {
  public async execute({ recipient_id }: RequestData): Promise<void> {
    const recipientExists = await Recipient.findOne(recipient_id);

    if (!recipientExists) {
      throw new AppError("Recipient doesn't exists");
    }

    await Recipient.remove(recipientExists);
  }
}
