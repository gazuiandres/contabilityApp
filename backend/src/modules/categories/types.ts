import { Request, Response, NextFunction } from 'express';
import { BasedCategoryDto, FilterCategoryDto, UpdateCategoryDto } from './dtos/category.dto';

export interface CategoryControllerInterface {
  getCategories(req: Request, res: Response, next: NextFunction): Promise<void>;
  getCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface CategoryServiceInterface {
  getAll(filter: FilterCategoryDto): Promise<BasedCategoryDto[]>;
  getOne(id: string): Promise<BasedCategoryDto>;
  create(data: BasedCategoryDto): Promise<BasedCategoryDto>;
  updateOne(id: string, data: UpdateCategoryDto): Promise<void>;
  deleteOne(id: string): Promise<void>;
}
