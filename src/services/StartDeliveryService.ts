import { Between } from 'typeorm';
import {
  startOfDay,
  endOfDay,
  isWithinInterval,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';

import AppError from '../errors/AppError';

import Delivery from '../models/Delivery';

interface RequestData {
  deliverymanId: number;
  deliveryId: number;
}

export default class StartDeliveryService {
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

    if (findDelivery.start_date !== null) {
      throw new AppError('Delivery already started');
    }

    const verifyIfDeliverymanHasLessThanFiveDeliveriesOnSameDate = await Delivery.find(
      {
        where: {
          deliveryman_id: deliverymanId,
          start_date: Between(startOfDay(Date.now()), endOfDay(Date.now())),
        },
      },
    );

    if (verifyIfDeliverymanHasLessThanFiveDeliveriesOnSameDate.length >= 5) {
      throw new AppError('You can only do five deliveries per day.');
    }

    const formattedPossibleRangeDate = {
      start: setSeconds(setMinutes(setHours(new Date(Date.now()), 8), 0), 0),
      end: setSeconds(setMinutes(setHours(new Date(Date.now()), 18), 0), 0),
    };

    if (!isWithinInterval(Date.now(), formattedPossibleRangeDate)) {
      throw new AppError(
        'You can only start a delivery between 08:00h and 18:00h',
      );
    }

    findDelivery.start_date = new Date(Date.now());

    await findDelivery.save();

    return findDelivery;
  }
}
