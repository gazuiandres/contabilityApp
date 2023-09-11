import { Request, Response, NextFunction } from 'express';
import AuthService from './service';
import { AuthControllerInterface } from './types';
import SendEmailClass from '../../libs/emails';
import { UserToken } from '../../global';

import config from '../../config';

class AuthController implements AuthControllerInterface {
  constructor(private service: AuthService, private emailService: SendEmailClass) {}

  async login({ body }: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = body;
      const user = await this.service.getUser({ email, password });
      const access_token = this.service.signAccesToken(user);
      const refresh_token = this.service.signRefreshToken(user);
      res.cookie('refreshCookie', refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30 * 1000,
      });
      res.json({ ...user, access_token, refresh_token });
    } catch (error) {
      next(error);
    }
  }

  async signUp({ body }: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = body;
      await this.service.registerUser({ email, password });
      res.status(201).json({
        message: 'User registered',
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refresh_token } = req.body;
      if (!refresh_token) {
        return res.status(400).json({ message: 'refresh token not found' });
      }
      const verify = this.service.verifyJwt(refresh_token);
      const acces_token = this.service.signAccesToken(verify);
      res.json({ acces_token });
    } catch (error) {
      next(error);
    }
  }

  async recoveryEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenUser = req.user as UserToken;
      const user = await this.service.findUser(tokenUser.sub);
      const recoveryToken = this.service.signRecoveryToken({ id: user.id, roles: user.roles });

      const mail = {
        to: user.email,
        subject: 'Change your email',
      };

      const templateData = {
        domain: config.clientHost,
        token: recoveryToken,
      };

      const resp = await this.emailService.recoveryEmail(mail, templateData);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }

  async recoveryPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenUser = req.user as UserToken;
      const user = await this.service.findUser(tokenUser.sub);
      const recoveryToken = this.service.signRecoveryToken({ id: user.id, roles: user.roles });

      const mail = {
        to: user.email,
        subject: 'Change your password',
      };

      const templateData = {
        domain: config.clientHost,
        token: recoveryToken,
      };

      const resp = await this.emailService.recoveryPassword(mail, templateData);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenUser = req.user as UserToken;
      await this.service.updateUser(tokenUser.sub, req.body);
      res.json({
        message: 'auth user updated',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
