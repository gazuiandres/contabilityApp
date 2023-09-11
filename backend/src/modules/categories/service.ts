import { Model } from 'mongoose';
import boom from '@hapi/boom';

import { BasedCategoryDto, UpdateCategoryDto, FilterCategoryDto } from './dtos/category.dto';
import { CategoryServiceInterface } from './types';

class CategoryService implements CategoryServiceInterface {
  constructor(private model: Model<BasedCategoryDto>) {}

  async getAll({type}: FilterCategoryDto) {
    let options: FilterCategoryDto = {}
    if(type) {
      options = {
        type
      }
    }
    const categories = await this.model.find(options);
    return categories;
  }

  async getOne(id: string) {
    const category = await this.model.findOne({ _id: id });
    if (!category) {
      throw boom.notFound('Category not found');
    }

    return category;
  }

  async create(data: BasedCategoryDto) {
    const newCategory = await this.model.create(data);
    return newCategory;
  }

  async updateOne(id: string, data: UpdateCategoryDto) {
    const category = await this.model.findOneAndUpdate({ _id: id }, data);

    if (!category) {
      throw boom.badRequest('Error updating category');
    }
  }

  async deleteOne(id: string) {
    const category = await this.model.findOneAndDelete({ _id: id });
    if (!category) {
      throw boom.badRequest('Error deleting category');
    }
  }
}

export default CategoryService;
