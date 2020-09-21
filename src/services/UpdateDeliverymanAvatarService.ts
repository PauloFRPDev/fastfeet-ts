import AppError from '../errors/AppError';

import StorageProvider from '../providers/DiskStorageProvider';
import Deliveryman from '../models/Deliveryman';

interface RequestData {
  deliveryman_id: number;
  avatarFilename: string;
}

export default class UpdateDeliverymanAvatarService {
  public async execute({
    deliveryman_id,
    avatarFilename,
  }: RequestData): Promise<Deliveryman> {
    const storageProvider = new StorageProvider();

    const deliveryman = await Deliveryman.findOne(deliveryman_id);

    if (!deliveryman) {
      throw new AppError('Deliveryman not found');
    }

    if (deliveryman.avatar) {
      await storageProvider.deleteFile(deliveryman.avatar);
    }

    const filename = await storageProvider.saveFile(avatarFilename);

    deliveryman.avatar = filename;

    await deliveryman.save();

    return deliveryman;
  }
}
