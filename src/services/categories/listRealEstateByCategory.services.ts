import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { ICategoriesWithRealEstateReturn } from '../../interfaces/categories.interfaces'

const listRealEstateByCategory = async (categoryId: number): Promise<ICategoriesWithRealEstateReturn> => {
  const realEstateRepo: Repository<Category> = AppDataSource.getRepository(Category)

  const findRealEstate = await realEstateRepo.createQueryBuilder("category")
    .innerJoinAndSelect("category.realEstate", "real_estate")
    .where("category.id = :categoryId", {categoryId})
    .getOne()

  return findRealEstate!
}

export default listRealEstateByCategory