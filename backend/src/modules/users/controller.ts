import type { UserControllerInterface, UserServiceInterface } from './types';
import { Response, Request } from 'express';

class UserController implements UserControllerInterface {
  constructor(private service: UserServiceInterface) {}

  async getAll(req: Request, res: Response) {
    const users = await this.service.getUsers();
    res.json(users);
  }

  async create(req: Request, res: Response) {
    const data = req.body;
    const user = await this.service.createUser(data);
    res.json(user);
  }
}

export default UserController;
