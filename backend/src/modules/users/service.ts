import { Model } from 'mongoose';
import type { UserServiceInterface } from './types';
import type { UserDTO } from './dtos/user.dto';

class UserService implements UserServiceInterface {
  constructor(private model: Model<UserDTO>) {}

  async getUsers(): Promise<UserDTO[]> {
    const users = await this.model.find();
    return users;
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    const user = await this.model.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async createUser(data: UserDTO): Promise<UserDTO> {
    const user = await this.model.create(data);
    return user;
  }
}

export default UserService;
