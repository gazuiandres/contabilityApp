import { Router } from 'express';
import userController from '.';

const userRouter = Router();

userRouter.get('/', userController.getAll.bind(userController));
userRouter.post('/', userController.create.bind(userController));

export default userRouter;
