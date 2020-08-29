import AppError from '../errors/AppError';

import Deliveryman from '../models/Deliveryman';

interface RequestData {
  deliverymanId: string;
  name: string;
  email: string;
}

export default class UpdateDeliverymanService {
  public async execute({
    deliverymanId,
    name,
    email,
  }: RequestData): Promise<Deliveryman> {
    const deliveryman = await Deliveryman.findOne(deliverymanId);

    if (!deliveryman) {
      throw new AppError('Deliveryman not found');
    }

    const deliverymanEmailAlreadyExists = await Deliveryman.findOne({
      where: { email },
    });

    if (
      deliverymanEmailAlreadyExists &&
      deliverymanEmailAlreadyExists.id !== Number(deliverymanId)
    ) {
      throw new AppError('E-mail already in use');
    }

    deliveryman.name = name;
    deliveryman.email = email;

    await deliveryman.save();

    return deliveryman;
  }
}
