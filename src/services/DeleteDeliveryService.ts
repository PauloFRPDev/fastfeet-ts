import path from 'path';

import AppError from '../errors/AppError';
import MailProvider from '../providers/MailProvider';

import Delivery from '../models/Delivery';

interface RequestData {
  delivery_id: number;
}

export default class DeleteDeliveryService {
  public async execute({ delivery_id }: RequestData): Promise<void> {
    const delivery = await Delivery.findOne(delivery_id, {
      relations: ['deliveryman', 'recipient'],
    });

    if (!delivery) {
      throw new AppError('Delivery not found');
    }

    delivery.canceled_at = new Date(Date.now());

    await delivery.save();

    const { deliveryman } = delivery;
    const { recipient } = delivery;

    const deliveryCanceledTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'MailTemplates',
      'delivery_canceled.hbs',
    );

    const mailProvider = new MailProvider();

    const parsedAddress = `${recipient.street}, ${recipient.number} - ${recipient.cep} - ${recipient.city}/${recipient.state}`;

    await mailProvider.sendMail({
      to: deliveryman.email,
      subject: '[FastFeet] Entrega cancelada',
      templateData: {
        file: deliveryCanceledTemplate,
        variables: {
          name: deliveryman.name,
          product: delivery.product,
          recipientName: recipient.name,
          recipientAddress: parsedAddress,
        },
      },
    });
  }
}
