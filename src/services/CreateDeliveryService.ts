import AppError from '../errors/AppError';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

interface RequestData {
  recipient_id: number;
  deliveryman_id: number;
  product: string;
}

export default class CreateDeliveryService {
  public async execute({
    recipient_id,
    deliveryman_id,
    product,
  }: RequestData): Promise<Delivery> {
    const recipientExists = await Recipient.findOne(recipient_id);

    if (!recipientExists) {
      throw new AppError('Recipient not found');
    }

    const deliverymanExists = await Recipient.findOne(deliveryman_id);

    if (!deliverymanExists) {
      throw new AppError('Deliveryman not found');
    }

    const delivery = Delivery.create({
      recipient_id,
      deliveryman_id,
      product,
    });

    await delivery.save();

    return delivery;
  }
}
