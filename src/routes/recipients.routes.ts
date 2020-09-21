import { Router } from 'express';

import AppError from '../errors/AppError';
import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';

import Recipient from '../models/Recipient';
import CreateRecipientService from '../services/CreateRecipientService';
import UpdateRecipientService from '../services/UpdateRecipientService';
import DeleteRecipientService from '../services/DeleteRecipientService';

const recipientsRouter = Router();

recipientsRouter.use(EnsureAuthenticated);

/* Show recipient */
recipientsRouter.get('/:recipientId', async (request, response) => {
  const { recipientId } = request.params;

  const recipient = await Recipient.findOne({ where: { id: recipientId } });

  if (!recipient) {
    throw new AppError('Recipient not found');
  }

  return response.json(recipient);
});

/* List recipients */
recipientsRouter.get('/', async (request, response) => {
  const recipients = await Recipient.find();

  return response.json(recipients);
});

/* Create recipient */
recipientsRouter.post('/', async (request, response) => {
  const { name, street, number, complement, state, city, cep } = request.body;

  const createRecipient = new CreateRecipientService();

  const recipient = await createRecipient.execute({
    name,
    street,
    number,
    complement,
    state,
    city,
    cep,
  });

  response.json(recipient);
});

/* Update recipient */
recipientsRouter.put('/:recipientId', async (request, response) => {
  const { recipientId } = request.params;
  const { name, street, number, complement, state, city, cep } = request.body;

  const updateRecipient = new UpdateRecipientService();

  const recipient = await updateRecipient.execute({
    recipient_id: Number(recipientId),
    name,
    street,
    number,
    complement,
    state,
    city,
    cep,
  });

  response.json(recipient);
});

/* Delete recipient */
recipientsRouter.delete('/:recipientId', async (request, response) => {
  const { recipientId } = request.params;

  const deleteRecipient = new DeleteRecipientService();

  await deleteRecipient.execute({ recipient_id: Number(recipientId) });

  return response.status(201).json();
});

export default recipientsRouter;
