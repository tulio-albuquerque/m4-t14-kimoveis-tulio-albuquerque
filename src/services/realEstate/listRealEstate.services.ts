import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { RealEstate } from '../../entities'
import { IRealEstatesResponse } from '../../interfaces'
import { returnMultipleRealEstateSchema } from '../../schemas/realEstate.schemas'

const listRealEstateService = async (): Promise<IRealEstatesResponse> => {
  const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

  const findRealEstate = await realEstateRepo.find({
    relations: {
      address: true
    }
  })

  const realEstate: IRealEstatesResponse = returnMultipleRealEstateSchema.parse(findRealEstate)
  return realEstate
}

export default listRealEstateService