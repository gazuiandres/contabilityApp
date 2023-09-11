import CategoryModel from './entity';
import CategoryService from './service';
import CategoryController from './controllers';

const service = new CategoryService(CategoryModel);
const categoryController = new CategoryController(service);

export default categoryController;
