import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { IScheduleRequest } from "../interfaces";

const ensureIsValidDateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const scheduleData: IScheduleRequest = req.body
  
  if(scheduleData.date && typeof scheduleData.date === "string"
    && scheduleData.hour && typeof scheduleData.hour === "string") {
    const [ year, day, month ] = req.body.date.split("/")
    const [ hour, minute ] = req.body.hour.split(":")

    const date = new Date(year, Number(month)-1, day, hour, minute)

    const weekDay = date.getDay()
    if(weekDay === 0 || weekDay === 6) {
      throw new AppError("Invalid date, work days are monday to friday", 400)
    }

    const hourDay = date.getHours()
    if(hourDay < 8 || hourDay > 18) {
      throw new AppError("Invalid hour, available times are 8AM to 18PM", 400)
    }
  }
  
  return next()
}

export default ensureIsValidDateMiddleware