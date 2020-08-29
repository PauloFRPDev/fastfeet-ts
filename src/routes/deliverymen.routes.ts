import { Router } from 'express';

import AppError from '../errors/AppError';
import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';

import Deliveryman from '../models/Deliveryman';
import CreateDeliverymanService from '../services/CreateDeliverymanService';
import UpdateDeliverymanService from '../services/UpdateDeliverymanService';
import DeleteDeliverymanService from '../services/DeleteDeliverymanService';

const deliverymenRouter = Router();

deliverymenRouter.use(EnsureAuthenticated);

deliverymenRouter.get('/:deliverymanId', async (request, response) => {
  const { deliverymanId } = request.params;

  const deliveryman = await Deliveryman.findOne(deliverymanId);

  if (!deliveryman) {
    throw new AppError('Deliveryman not found');
  }

  return response.json(deliveryman);
});

deliverymenRouter.get('/', async (request, response) => {
  const deliverymen = await Deliveryman.find();

  return response.json(deliverymen);
});

deliverymenRouter.post('/', async (request, response) => {
  const { name, email } = request.body;

  const createDeliveryman = new CreateDeliverymanService();

  const deliveryman = await createDeliveryman.execute({
    name,
    email,
  });

  return response.json(deliveryman);
});

deliverymenRouter.put('/:deliverymanId', async (request, response) => {
  const { deliverymanId } = request.params;
  const { name, email } = request.body;

  const updateDeliveryman = new UpdateDeliverymanService();

  const deliveryman = await updateDeliveryman.execute({
    deliverymanId,
    name,
    email,
  });

  return response.json(deliveryman);
});

deliverymenRouter.delete('/:deliverymanId', async (request, response) => {
  const { deliverymanId } = request.params;

  const deleteDeliveryman = new DeleteDeliverymanService();

  await deleteDeliveryman.execute({ deliverymanId });

  return response.status(201).json();
});

export default deliverymenRouter;
