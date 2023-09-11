import { Request, Response, NextFunction } from 'express';
import { AuthDto, AuthUserJwtDto, AuthUserLogged } from './dtos/auth.dto';

export interface AuthControllerInterface {
  login: (req: Request, res: Response, next: NextFunction) => void;
  signUp: (req: Request, res: Response, next: NextFunction) => void;
  refreshToken: (req: Request, res: Response, next: NextFunction) => void;
}

export interface AuthServiceInterface {
  getUser: (data: AuthDto) => Promise<AuthUserLogged>;
  signAccesToken: (user: AuthUserJwtDto) => string;
  verifyJwt: (token: string) => AuthUserJwtDto;
  signRefreshToken: (user: AuthUserJwtDto) => string;
  signRecoveryToken: (user: AuthUserJwtDto) => string;
  registerUser: (data: AuthDto) => Promise<void>;
}
