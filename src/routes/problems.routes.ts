import { Router } from 'express';

import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';

import Problem from '../models/Problem';
import CreateProblemService from '../services/CreateProblemService';
import DeleteDeliveryByProblemService from '../services/DeleteDeliveryByProblemService';

const problemsRouter = Router();

/* List problems of a specific delivery */
problemsRouter.get(
  '/delivery/:deliveryId/problems',
  async (request, response) => {
    const { deliveryId } = request.params;

    const deliveryProblems = await Problem.find({
      where: { delivery_id: deliveryId },
    });

    return response.json(deliveryProblems);
  },
);

/* Create problem to a delivery */
problemsRouter.post(
  '/delivery/:deliveryId/problems',
  async (request, response) => {
    const { deliveryId } = request.params;
    const { description } = request.body;

    const createProblem = new CreateProblemService();

    const problem = await createProblem.execute({
      delivery_id: Number(deliveryId),
      description,
    });

    return response.json(problem);
  },
);

problemsRouter.use(EnsureAuthenticated);

/* Cancel delivery with a problem */
problemsRouter.delete(
  '/problem/:problemId/cancel-delivery',
  async (request, response) => {
    const { problemId } = request.params;

    const deleteDeliveryByProblem = new DeleteDeliveryByProblemService();

    await deleteDeliveryByProblem.execute({
      problem_id: Number(problemId),
    });

    return response.status(201).json();
  },
);

export default problemsRouter;
