import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { ICategoriesWithRealEstateReturn } from '../../interfaces/categories.interfaces'

const listRealEstateByCategory = async (categoryId: number): Promise<ICategoriesWithRealEstateReturn> => {
  const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category)

  const category = await categoryRepo.findOne({
    relations: {
      realEstate: true
    },
    where: {
      id: categoryId
    }
  })

  return category!
}

export default listRealEstateByCategory