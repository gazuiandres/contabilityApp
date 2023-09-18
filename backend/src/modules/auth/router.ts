import { Router } from 'express';
import passport from 'passport';
import authController from '.';

import { schemaValidation } from '../../middlewares/validationSchema';
import { credentialsSchema } from './validationSchemas';


const authRouter = Router();

authRouter.post('/login', schemaValidation(credentialsSchema), authController.login.bind(authController));
authRouter.post('/signup', schemaValidation(credentialsSchema), authController.signUp.bind(authController));
authRouter.post('/refresh', authController.refreshToken.bind(authController));
authRouter.get(
  '/email-recovery',
  passport.authenticate('jwt', { session: false }),
  authController.recoveryEmail.bind(authController),
);
authRouter.get(
  '/password-recovery',
  passport.authenticate('jwt', { session: false }),
  authController.recoveryPassword.bind(authController),
);
authRouter.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  authController.updateUser.bind(authController),
);

export default authRouter;
