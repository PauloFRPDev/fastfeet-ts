import { Router } from 'express';
import { Not } from 'typeorm';

import AppError from '../errors/AppError';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import StartDeliveryService from '../services/StartDeliveryService';
import EndDeliveryService from '../services/EndDeliveryService';

const deliverymanDeliveriesRouter = Router();

/* List all deliveries of a deliveryman, already delivered or not */
deliverymanDeliveriesRouter.get(
  '/:deliverymanId/deliveries',
  async (request, response) => {
    const { deliverymanId } = request.params;
    const { delivered } = request.query;

    const findDeliveryman = await Deliveryman.findOne(deliverymanId);

    if (!findDeliveryman) {
      throw new AppError('Deliveryman not found');
    }

    const deliveries = delivered
      ? await Delivery.find({
          where: {
            deliveryman_id: deliverymanId,
            canceled_at: null,
            end_date: Not(null),
          },
        })
      : await Delivery.find({
          where: {
            deliveryman_id: deliverymanId,
            canceled_at: null,
            end_date: null,
          },
        });

    return response.json(deliveries);
  },
);

/* Start a delivery */
deliverymanDeliveriesRouter.patch(
  '/:deliverymanId/delivery/:deliveryId/start_delivery',
  async (request, response) => {
    const { deliverymanId, deliveryId } = request.params;

    const startDelivery = new StartDeliveryService();

    const delivery = await startDelivery.execute({
      deliverymanId: Number(deliverymanId),
      deliveryId: Number(deliveryId),
    });

    return response.json(delivery);
  },
);

/* End a delivery */
deliverymanDeliveriesRouter.patch(
  '/:deliverymanId/delivery/:deliveryId/end_delivery',
  async (request, response) => {
    const { deliverymanId, deliveryId } = request.params;

    const endDelivery = new EndDeliveryService();

    const delivery = await endDelivery.execute({
      deliverymanId: Number(deliverymanId),
      deliveryId: Number(deliveryId),
    });

    return response.json(delivery);
  },
);

export default deliverymanDeliveriesRouter;
