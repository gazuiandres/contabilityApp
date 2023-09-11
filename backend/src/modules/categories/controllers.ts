import { Request, Response, NextFunction } from 'express';
import CategoryService from './service';

import { CategoryControllerInterface } from './types';
import { FilterCategoryDto } from './dtos/category.dto';

class CategoryController implements CategoryControllerInterface {
  constructor(private service: CategoryService) {}

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.service.getAll(req.query as FilterCategoryDto);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async getCategory({ params }: Request, res: Response, next: NextFunction) {
    try {
      const { id } = params;
      const category = await this.service.getOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async create({ body }: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, type } = body;
      const category = await this.service.create({ name, description, type });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  async update({ body, params }: Request, res: Response, next: NextFunction) {
    try {
      const { id } = params;
      await this.service.updateOne(id, body);
      res.json({
        message: 'Category updated',
      });
    } catch (error) {
      next(error);
    }
  }

  async delete({ params }: Request, res: Response, next: NextFunction) {
    try {
      const { id } = params;
      await this.service.deleteOne(id);
      res.json({
        message: 'Category deleted succesfully ',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
