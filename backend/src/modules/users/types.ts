import { Response, Request } from 'express';
import { UserDTO } from './dtos/user.dto';

export interface UserControllerInterface {
  getAll: (req: Request, res: Response) => void;
  create: (req: Request, res: Response) => void;
}

export interface UserServiceInterface {
  getUsers: () => Promise<UserDTO[]>;
  getUserByEmail: (email: string) => Promise<UserDTO>;
  createUser: (data: UserDTO) => Promise<UserDTO>;
}

