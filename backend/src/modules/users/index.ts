import UserModel from './entity';
import UserService from './service';
import UserController from './controller';

const userService = new UserService(UserModel);
const userController = new UserController(userService);
export default userController;
