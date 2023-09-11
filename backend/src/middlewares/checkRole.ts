import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom'
import { UserToken } from '../global';

export default function checkRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserToken;
    for (const role of user.roles) {
      if (roles.includes(role)) {
        return next();
      }
    }
    next(boom.unauthorized());
  };
}
