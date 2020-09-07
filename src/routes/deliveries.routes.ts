import { Router } from 'express';
import { In } from 'typeorm';

import AppError from '../errors/AppError';
import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';

import Problem from '../models/Problem';
import Delivery from '../models/Delivery';
import CreateDeliveryService from '../services/CreateDeliveryService';
import UpdateDeliveryService from '../services/UpdateDeliveryService';
import DeleteDeliveryService from '../services/DeleteDeliveryService';

const deliveriesRouter = Router();

deliveriesRouter.use(EnsureAuthenticated);

/* Get deliveries with problems */
deliveriesRouter.get('/problems', async (request, response) => {
  const distinctProblems = await Problem.createQueryBuilder()
    .distinctOn(['delivery_id'])
    .getMany();

  if (!distinctProblems) {
    throw new AppError('There are no problems');
  }

  const problemIds = distinctProblems.map(problem => {
    return problem.delivery_id;
  });

  const deliveryWithProblems = await Delivery.find({ id: In(problemIds) });

  return response.json(deliveryWithProblems);
});

/* Show delivery */
deliveriesRouter.get('/:deliveryId', async (request, response) => {
  const { deliveryId } = request.params;

  const delivery = await Delivery.findOne(deliveryId, {
    relations: ['recipient', 'deliveryman'],
  });

  if (!delivery) {
    throw new AppError('Delivery not found');
  }

  return response.json(delivery);
});

/* List deliveries */
deliveriesRouter.get('/', async (request, response) => {
  const deliveries = await Delivery.find({
    relations: ['recipient', 'deliveryman'],
  });

  return response.json(deliveries);
});

/* Create delivery */
deliveriesRouter.post('/', async (request, response) => {
  const { recipient_id, deliveryman_id, product } = request.body;

  const createDelivery = new CreateDeliveryService();

  const delivery = await createDelivery.execute({
    recipient_id,
    deliveryman_id,
    product,
  });

  return response.json(delivery);
});

/* Update delivery */
deliveriesRouter.put('/:deliveryId', async (request, response) => {
  const { deliveryId } = request.params;
  const {
    recipient_id,
    deliveryman_id,
    product,
    canceled_at,
    start_date,
    end_date,
  } = request.body;

  const updateDelivery = new UpdateDeliveryService();

  const delivery = await updateDelivery.execute({
    delivery_id: Number(deliveryId),
    recipient_id,
    deliveryman_id,
    product,
    canceled_at,
    start_date,
    end_date,
  });

  return response.json(delivery);
});

/* Delete delivery */
deliveriesRouter.delete('/:deliveryId', async (request, response) => {
  const { deliveryId } = request.params;

  const deleteDelivery = new DeleteDeliveryService();

  await deleteDelivery.execute({ delivery_id: Number(deliveryId) });

  return response.status(201).json();
});

export default deliveriesRouter;
