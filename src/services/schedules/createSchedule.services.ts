import { IScheduleRequest, IScheduleResponse} from "../../interfaces"
import { AppDataSource } from "../../data-source"
import { User, RealEstate, Schedule,  } from "../../entities"
import { Repository } from "typeorm"

const createScheduleService = async (scheduleData: IScheduleRequest, userId: number): Promise<IScheduleResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User)
  const scheduleRepo: Repository<Schedule> = AppDataSource.getRepository(Schedule)
  const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

  const userData = await userRepo.findOneByOrFail({
    id: userId
  })

  const realEstateData = await realEstateRepo.findOne({
    relations: {
      address: true,
      category: true
    },
    where: {
      id: scheduleData.realEstateId
    }
  })

  const schedule = scheduleRepo.create({
    date: scheduleData.date,
    hour: scheduleData.hour,
    user: userData,
    realEstate: realEstateData!
  })

  await scheduleRepo.save(schedule)

  return schedule!
}

export default createScheduleService