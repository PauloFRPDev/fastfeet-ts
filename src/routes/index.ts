import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

import recipientsRouter from './recipients.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.use('/recipients', recipientsRouter);

export default routes;
