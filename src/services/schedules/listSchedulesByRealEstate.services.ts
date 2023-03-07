import { AppDataSource } from '../../data-source'
import { RealEstate } from '../../entities'
import { IRealEstateWithSchedulesResponse } from '../../interfaces/realEstate.interfaces'
import { returnRealEstateWithSchedulesSchema } from '../../schemas/realEstate.schemas'

const listSchedulesByRealEstateService = async (realEstateId: number): Promise<IRealEstateWithSchedulesResponse> => {

  const findSchedules = await
    AppDataSource.createQueryBuilder()
    .select("real_estate")
    .from(RealEstate, "real_estate")
    .innerJoinAndSelect("real_estate.address", "address")
    .innerJoinAndSelect("real_estate.category", "category")
    .innerJoinAndSelect("real_estate.schedules", "schedules")
    .innerJoinAndSelect("schedules.user", "user")
    .where("real_estate.id = :rId", {rId: realEstateId})
    .getOne()

  return findSchedules!
}

export default listSchedulesByRealEstateService