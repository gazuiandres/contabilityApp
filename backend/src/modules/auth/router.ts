import { Router } from 'express';
import passport from 'passport';
import authController from '.';

const authRouter = Router();

authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/signup', authController.signUp.bind(authController));
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
