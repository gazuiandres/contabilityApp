import config from '../../config';
import UserModel from '../users/entity';
import AuthService from './service';
import AuthController from './controller';

import SendEmailClass from '../../libs/emails';

const authService = new AuthService(UserModel);
const emailService = new SendEmailClass(config.emailConfig.user, config.emailConfig.password, config.emailConfig.host);
const authController = new AuthController(authService, emailService);
export default authController;
