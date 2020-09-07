import AppError from '../errors/AppError';

import Problem from '../models/Problem';
import Delivery from '../models/Delivery';

interface RequestData {
  delivery_id: number;
  description: string;
}

export default class CreateProblemService {
  public async execute({
    delivery_id,
    description,
  }: RequestData): Promise<Problem> {
    const findDelivery = await Delivery.findOne(delivery_id);

    if (!findDelivery) {
      throw new AppError('Delivery not found');
    }

    const problem = Problem.create({ delivery_id, description });

    await problem.save();

    return problem;
  }
}
