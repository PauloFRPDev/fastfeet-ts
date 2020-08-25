import { Router } from 'express';

import CreateDeliverymanService from '../services/CreateDeliverymanService';

const deliverymenRouter = Router();

deliverymenRouter.post('/', async (request, response) => {
  const { name, email } = request.body;

  const createDeliveryman = new CreateDeliverymanService();

  const deliveryman = await createDeliveryman.execute({
    name,
    email,
  });

  return response.json(deliveryman);
});

export default deliverymenRouter;
