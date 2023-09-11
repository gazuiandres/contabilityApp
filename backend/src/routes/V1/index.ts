import { Express } from 'express';
import passport from 'passport';

import userRouter from '../../modules/users/router';
import authRouter from '../../modules/auth/router';
import categoryRouter from '../../modules/categories/router';
import transactionRouter from '../../modules/transactions/router';

import checkRole from '../../middlewares/checkRole';

const setupV1Routes = (app: Express) => {
  app.use('/api/v1/users', passport.authenticate('jwt', { session: false }), checkRole(['admin']), userRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/categories', passport.authenticate('jwt', { session: false }), categoryRouter);
  app.use('/api/v1/transactions', passport.authenticate('jwt', { session: false }), transactionRouter);
};

export default setupV1Routes;
