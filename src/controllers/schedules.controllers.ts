import { Request, Response } from "express"
import { IScheduleRequest } from "../interfaces"
import createScheduleService from "../services/schedules/createSchedule.services"
import listSchedulesByRealEstateService from "../services/schedules/listSchedulesByRealEstate.services"

// // POST	/schedules
// Agenda uma visita a um imóvel
const createSchedulesController = async (req: Request, res: Response): Promise<Response> => {
  const authorizedUser = req.user
  const scheduleData: IScheduleRequest = req.body

  const newSchedule = await createScheduleService(scheduleData, authorizedUser.id)

  return res.status(201).json({
    message: "Schedule created"
  })
}

// // GET	/schedules/realEstate/:id
// Lista todos os agendamentos de um imóvel
const listSchedulesController = async (req: Request, res: Response): Promise<Response> => {
  const realEstateId = parseInt(req.params.id)

  const schedulesData = await listSchedulesByRealEstateService(realEstateId)

  return res.status(200).json(schedulesData)
}

export {
  createSchedulesController,
  listSchedulesController
}