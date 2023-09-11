export interface BasedCategoryDto {
  name: string;
  description: string;
  type: string;
}

export type FilterCategoryDto = Partial<Pick<BasedCategoryDto, 'type'>>;

export type UpdateCategoryDto = Partial<BasedCategoryDto>;
