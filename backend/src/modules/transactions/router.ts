import { Router } from 'express';

import transactionController from '.';
import checkRole from '../../middlewares/checkRole';
import { schemaValidation } from '../../middlewares/validationSchema';

import {
  GetAllTransactionsSchema,
  GetAnalyticsSchema,
  CreateTransactionSchema,
  UpdateTransactionSchema,
  DeleteTransactionSchema,
} from './validationSchemas/transaction.schema';

const transactionRouter = Router();

transactionRouter.get(
  '/',
  checkRole(['user', 'admin']),
  schemaValidation(GetAllTransactionsSchema),
  transactionController.getAll.bind(transactionController),
);
transactionRouter.get(
  '/analytics',
  checkRole(['user']),
  schemaValidation(GetAnalyticsSchema),
  transactionController.getAnalytics.bind(transactionController),
);
transactionRouter.get('/:id', checkRole(['user', 'admin']), transactionController.getTransaction.bind(transactionController));
transactionRouter.post(
  '/',
  checkRole(['user']),
  schemaValidation(CreateTransactionSchema),
  transactionController.create.bind(transactionController),
);
transactionRouter.put(
  '/:id',
  checkRole(['user']),
  schemaValidation(UpdateTransactionSchema),
  transactionController.update.bind(transactionController),
);
transactionRouter.delete(
  '/:id',
  checkRole(['user']),
  schemaValidation(DeleteTransactionSchema),
  transactionController.delete.bind(transactionController),
);

export default transactionRouter;
