import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

import recipientsRouter from './recipients.routes';
import deliverymenRouter from './deliverymen.routes';
import deliveriesRouter from './deliveries.routes';
import problemsRouter from './problems.routes';
import deliverymanDeliveriesRouter from './deliverymanDeliveries.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.use('/recipients', recipientsRouter);
routes.use('/deliverymen', deliverymenRouter);
routes.use('/', problemsRouter);
routes.use('/deliveries', deliveriesRouter);
routes.use('/deliveryman', deliverymanDeliveriesRouter);

export default routes;
