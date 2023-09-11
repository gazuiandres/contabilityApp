import mongoose from 'mongoose';
import { UserDTO } from './dtos/user.dto';
const { Schema, model } = mongoose;

const userSchema = new Schema<UserDTO>({
  email: {
    require: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
  roles: {
    require: true,
    type: [String],
  },
});

const UserModel = model('users', userSchema);

export default UserModel;
