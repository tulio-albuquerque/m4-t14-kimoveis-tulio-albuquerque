import { IRealEstateRequest, IRealEstateResponse} from "../../interfaces"
import { AppDataSource } from "../../data-source"
import { Address, Category, RealEstate } from "../../entities"
import { Repository } from "typeorm"
import { returnRealEstateSchema } from "../../schemas"

const createRealEstateService = async (realEstateData: IRealEstateRequest): Promise<IRealEstateResponse> => {
  const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category)
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address)
  const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

  let categoryData = null
  if(realEstateData.categoryId) {
    categoryData = await categoryRepo.findOneBy({
      id: realEstateData.categoryId
    })
  }

  const address = addressRepo.create(realEstateData.address)

  await addressRepo.save(address)

  const realEstate = realEstateRepo.create({
    ...realEstateData,
    address: address,
    category: categoryData
  })
  
  await realEstateRepo.save(realEstate)

  const newRealEstate = returnRealEstateSchema.parse(realEstate)
  return newRealEstate
}

export default createRealEstateService