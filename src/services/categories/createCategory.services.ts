import { ICategoryCreate, ICategoryReturn } from "../../interfaces"
import { AppDataSource } from "../../data-source"
import { Category } from "../../entities"
import { Repository } from "typeorm"
import { returnCategorySchema } from "../../schemas"

const createUserService = async (categoryData: ICategoryCreate): Promise<ICategoryReturn> => {
  const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category)

  const category = categoryRepo.create(categoryData)

  await categoryRepo.save(category)

  const newCategory = returnCategorySchema.parse(category)
  return newCategory
}

export default createUserService