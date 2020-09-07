import { Between } from 'typeorm';
import { startOfDay, endOfDay } from 'date-fns';

import AppError from '../errors/AppError';

import Delivery from '../models/Delivery';

interface RequestData {
  deliverymanId: number;
  deliveryId: number;
}

export default class EndDeliveryService {
  public async execute({
    deliverymanId,
    deliveryId,
  }: RequestData): Promise<Delivery> {
    const findDelivery = await Delivery.findOne({
      where: { deliveryman_id: deliverymanId, id: deliveryId },
    });

    if (!findDelivery) {
      throw new AppError('Delivery not found');
    }

    if (findDelivery.start_date === null) {
      throw new AppError('You can not end a delivery that is not started.');
    }

    const verifyIfDeliverymanHasLessThanFiveDeliveriesOnSameDate = await Delivery.find(
      {
        where: {
          deliveryman_id: deliverymanId,
          end_date: Between(startOfDay(Date.now()), endOfDay(Date.now())),
        },
      },
    );

    if (verifyIfDeliverymanHasLessThanFiveDeliveriesOnSameDate.length >= 5) {
      throw new AppError('You can only do five deliveries per day.');
    }

    findDelivery.end_date = new Date(Date.now());

    await findDelivery.save();

    return findDelivery;
  }
}
