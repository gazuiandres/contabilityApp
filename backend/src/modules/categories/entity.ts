import mongoose from 'mongoose';
import { BasedCategoryDto } from './dtos/category.dto';
const { Schema, model } = mongoose;

const categorySchema = new Schema<BasedCategoryDto>({
  name: {
    require: true,
    type: String,
  },
  description: {
    require: true,
    type: String,
  },
  type: {
    require: true,
    type: String,
  },
});

const CategoryModel = model('categories', categorySchema);

export default CategoryModel;
