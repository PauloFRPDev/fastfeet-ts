import AppError from '../errors/AppError';

import Deliveryman from '../models/Deliveryman';

interface RequestData {
  name: string;
  email: string;
}

export default class CreateDeliverymanService {
  public async execute({ name, email }: RequestData): Promise<Deliveryman> {
    const deliverymanExists = await Deliveryman.findOne({ where: { email } });

    if (deliverymanExists) {
      throw new AppError('Deliveryman already exists');
    }

    const deliveryman = Deliveryman.create({
      name,
      email,
    });

    await deliveryman.save();

    return deliveryman;
  }
}
