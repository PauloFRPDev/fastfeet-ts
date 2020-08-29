import AppError from '../errors/AppError';

import Delivery from '../models/Delivery';

interface RequestData {
  delivery_id: number;
  recipient_id: number;
  deliveryman_id: number;
  product: string;
  canceled_at?: Date | null;
  start_date?: Date | null;
  end_date?: Date | null;
}

export default class UpdateDeliveryService {
  public async execute({
    delivery_id,
    recipient_id,
    deliveryman_id,
    product,
    canceled_at,
    start_date,
    end_date,
  }: RequestData): Promise<Delivery> {
    const delivery = await Delivery.findOne(delivery_id);

    if (!delivery) {
      throw new AppError('Delivery not found');
    }

    delivery.recipient_id = recipient_id;
    delivery.deliveryman_id = deliveryman_id;
    delivery.product = product;

    if (canceled_at) {
      delivery.canceled_at = canceled_at;
    }

    if (start_date) {
      delivery.start_date = start_date;
    }

    if (end_date) {
      delivery.end_date = end_date;
    }

    await delivery.save();

    return delivery;
  }
}
