import AppError from '../errors/AppError';

import StorageProvider from '../providers/DiskStorageProvider';
import Delivery from '../models/Delivery';

interface RequestData {
  deliveryman_id: number;
  delivery_id: number;
  signatureFilename: string;
}

export default class UpdateDeliverySignatureService {
  public async execute({
    deliveryman_id,
    delivery_id,
    signatureFilename,
  }: RequestData): Promise<Delivery> {
    const storageProvider = new StorageProvider();

    const delivery = await Delivery.findOne(delivery_id);

    if (!delivery) {
      throw new AppError('Delivery not found');
    }

    if (delivery.deliveryman_id !== deliveryman_id) {
      throw new AppError('You can only update signatures for your deliveries.');
    }

    if (delivery.signature) {
      await storageProvider.deleteFile(delivery.signature);
    }

    const filename = await storageProvider.saveFile(signatureFilename);

    delivery.signature = filename;

    await delivery.save();

    return delivery;
  }
}
