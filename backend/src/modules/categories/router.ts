import { Router } from 'express';

import categoryController from '.';
import checkRole from '../../middlewares/checkRole';

const categoryRouter = Router();

categoryRouter.get('/', checkRole(['user', 'admin']), categoryController.getCategories.bind(categoryController));
categoryRouter.get('/:id', checkRole(['admin']), categoryController.getCategory.bind(categoryController));
categoryRouter.post('/', checkRole(['admin']), categoryController.create.bind(categoryController));
categoryRouter.put('/:id', checkRole(['admin']), categoryController.update.bind(categoryController));
categoryRouter.delete('/:id', checkRole(['admin']), categoryController.delete.bind(categoryController));

export default categoryRouter;
