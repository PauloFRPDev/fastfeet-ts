import AppError from '../errors/AppError';

import Deliveryman from '../models/Deliveryman';

interface RequestData {
  deliverymanId: string;
}

export default class DeleteDeliverymanService {
  public async execute({ deliverymanId }: RequestData): Promise<void> {
    const deliveryman = await Deliveryman.findOne(deliverymanId);

    if (!deliveryman) {
      throw new AppError('Deliveryman not found');
    }

    await deliveryman.remove();
  }
}
