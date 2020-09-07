import { Router } from 'express';

// import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';

// import Problem from '../models/Problem';
import CreateProblemService from '../services/CreateProblemService';

const problemsRouter = Router();

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

export default problemsRouter;
