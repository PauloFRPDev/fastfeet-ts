import AppError from '../errors/AppError';

import Delivery from '../models/Delivery';

interface RequestData {
  delivery_id: number;
}

export default class DeleteDeliveryService {
  public async execute({ delivery_id }: RequestData): Promise<void> {
    const delivery = await Delivery.findOne(delivery_id);

    if (!delivery) {
      throw new AppError('Delivery not found');
    }

    delivery.canceled_at = new Date(Date.now());

    await delivery.save();
  }
}
