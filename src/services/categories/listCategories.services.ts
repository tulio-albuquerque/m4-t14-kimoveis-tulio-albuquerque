import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { ICategoriesReturn } from '../../interfaces'
import { returnMultipleCategoriesSchema } from '../../schemas/categories.schemas'

const listCategoryService = async (categoryId: number): Promise<ICategoriesReturn> => {
  const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category)

  const findCategories = await categoryRepo.find()

  const categories: ICategoriesReturn = returnMultipleCategoriesSchema.parse(findCategories)
  return categories
}

export default listCategoryService