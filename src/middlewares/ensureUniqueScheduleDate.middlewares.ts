import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RealEstate, Schedule } from "../entities";
import { AppError } from "../error";
import { IScheduleRequest } from "../interfaces";

const ensureUniqueScheduleDateMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const scheduleData: IScheduleRequest = req.body;
  const authenticatedUser = req.user
  const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
  const scheduleRepo: Repository<Schedule> = AppDataSource.getRepository(Schedule)

  const schedule = await scheduleRepo.createQueryBuilder("schedule")
    .innerJoinAndSelect("schedule.user", "user")
    .innerJoinAndSelect("schedule.realEstate", "real_estate")
    .where("schedule.date = :date", {date: scheduleData.date})
    .andWhere("schedule.hour = :hour", {hour: scheduleData.hour})
    .getOne()

  // .findOne({
  //   relations: {
  //     realEstate: true,
  //     user: true,
  //   },
  //   where: {
  //     date: scheduleData.date,
  //     hour: scheduleData.hour,
  //     realEstate: {
  //       id: scheduleData.realEstateId
  //     }
  //   }
  // })

  if(schedule) {
    if(schedule.user && schedule.user.id === authenticatedUser.id) {
      throw new AppError("User schedule to this real estate at this date and time already exists", 409)
    }
    throw new AppError("Schedule to this real estate at this date and time already exists", 409)
  }

  return next()
}

export default ensureUniqueScheduleDateMiddleware