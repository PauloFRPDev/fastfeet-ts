import { Router } from 'express';
import { classToClass } from 'class-transformer';
import multer from 'multer';

import AppError from '../errors/AppError';
import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';
import uploadConfig from '../config/upload';

import Deliveryman from '../models/Deliveryman';
import CreateDeliverymanService from '../services/CreateDeliverymanService';
import UpdateDeliverymanService from '../services/UpdateDeliverymanService';
import DeleteDeliverymanService from '../services/DeleteDeliverymanService';
import UpdateDeliverymanAvatarService from '../services/UpdateDeliverymanAvatarService';

const deliverymenRouter = Router();

const upload = multer(uploadConfig.multer);

deliverymenRouter.use(EnsureAuthenticated);

/* Show deliveryman */
deliverymenRouter.get('/:deliverymanId', async (request, response) => {
  const { deliverymanId } = request.params;

  const deliveryman = await Deliveryman.findOne(deliverymanId);

  if (!deliveryman) {
    throw new AppError('Deliveryman not found');
  }

  return response.json(deliveryman);
});

/* List deliverymen */
deliverymenRouter.get('/', async (request, response) => {
  const deliverymen = await Deliveryman.find();

  return response.json(deliverymen);
});

/* Create deliveryman */
deliverymenRouter.post('/', async (request, response) => {
  const { name, email } = request.body;

  const createDeliveryman = new CreateDeliverymanService();

  const deliveryman = await createDeliveryman.execute({
    name,
    email,
  });

  return response.json(deliveryman);
});

/* Update deliveryman */
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

/* Delete deliveryman */
deliverymenRouter.delete('/:deliverymanId', async (request, response) => {
  const { deliverymanId } = request.params;

  const deleteDeliveryman = new DeleteDeliverymanService();

  await deleteDeliveryman.execute({ deliverymanId });

  return response.status(201).json();
});

/* Update avatar of a deliveryman */
deliverymenRouter.patch(
  '/:deliverymanId/update_avatar',
  upload.single('avatar'),
  async (request, response) => {
    const { deliverymanId } = request.params;

    const updateDeliverymanAvatar = new UpdateDeliverymanAvatarService();

    const deliveryman = await updateDeliverymanAvatar.execute({
      deliveryman_id: Number(deliverymanId),
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(deliveryman));
  },
);

export default deliverymenRouter;
