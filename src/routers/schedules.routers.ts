import { Router } from "express"
import {
  createSchedulesController,
  listSchedulesController
} from "../controllers/schedules.controllers"
import { RealEstate } from "../entities"
import { ensureIsAdminMiddleware, ensureIsValidDateMiddleware, ensureRealEstateIsValidMiddleware, ensureTokenIsValidMiddleware } from "../middlewares"
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares"
import ensureUniqueScheduleDateMiddleware from "../middlewares/ensureUniqueScheduleDate.middlewares"
import { createScheduleSchema } from "../schemas"

const schedulesRouters = Router()

// // POST	/schedules
// Agenda uma visita a um imóvel
schedulesRouters.post("", ensureTokenIsValidMiddleware, ensureIsValidDateMiddleware, ensureDataIsValidMiddleware(createScheduleSchema), ensureRealEstateIsValidMiddleware, ensureUniqueScheduleDateMiddleware, createSchedulesController)
// // GET	/schedules/realEstate/:id
// Lista todos os agendamentos de um imóvel
schedulesRouters.get("/realEstate/:id", ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, ensureRealEstateIsValidMiddleware, listSchedulesController)

export default schedulesRouters