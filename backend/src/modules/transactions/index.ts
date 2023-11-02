import TransactionModel from './entity';
import TransactionService from './service';
import TransactionController from './controller';
import TransactionManagement from '../../libs/TransactionManagement';
import EncryptManager from '../../libs/encryptManager' 


const service = new TransactionService(TransactionModel, new TransactionManagement(), EncryptManager);
const transactionController = new TransactionController(service);

export default transactionController;
