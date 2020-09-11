import path from 'path';

import AppError from '../errors/AppError';
import MailProvider from '../providers/MailProvider';

import Problem from '../models/Problem';

interface RequestData {
  problem_id: number;
}

export default class DeleteDeliveryByProblemService {
  public async execute({ problem_id }: RequestData): Promise<void> {
    const problem = await Problem.findOne(problem_id, {
      relations: ['delivery'],
    });

    if (!problem) {
      throw new AppError('Problem not found');
    }

    const { delivery } = problem;

    if (delivery.start_date === null) {
      throw new AppError("You can't cancel a delivery that didn't start yet.");
    }

    if (delivery.end_date !== null) {
      throw new AppError("You can't cancel a delivery that already finished.");
    }

    delivery.canceled_at = new Date(Date.now());

    delivery.save();

    // const { deliveryman, recipient } = delivery;

    // const deliveryCanceledTemplate = path.resolve(
    //   __dirname,
    //   '..',
    //   'views',
    //   'MailTemplates',
    //   'delivery_canceled.hbs',
    // );

    // const mailProvider = new MailProvider();

    // const parsedAddress = `${recipient.street}, ${recipient.number} - ${recipient.cep} - ${recipient.city}/${recipient.state}`;

    // await mailProvider.sendMail({
    //   to: deliveryman.email,
    //   subject: '[FastFeet] Entrega cancelada',
    //   templateData: {
    //     file: deliveryCanceledTemplate,
    //     variables: {
    //       name: deliveryman.name,
    //       product: delivery.product,
    //       recipientName: recipient.name,
    //       recipientAddress: parsedAddress,
    //     },
    //   },
    // });
  }
}
