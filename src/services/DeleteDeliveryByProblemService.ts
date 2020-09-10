import AppError from '../errors/AppError';

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
  }
}
