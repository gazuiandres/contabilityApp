import TransactionModel from './entity';
import TransactionService from './service';
import TransactionController from './controller';

import TransactionManagement from '../../libs/TransactionManagement';

const service = new TransactionService(TransactionModel, new TransactionManagement());
const transactionController = new TransactionController(service);

export default transactionController;
