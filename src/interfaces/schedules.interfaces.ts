import { z } from "zod"
import { createScheduleSchema, returnMultipleSchedulesSchema, returnScheduleSchema } from "../schemas"

type IScheduleRequest = z.infer<typeof createScheduleSchema>
type IScheduleResponse = z.infer<typeof returnScheduleSchema>
type ISchedulesResponse = z.infer<typeof returnMultipleSchedulesSchema>

export {
  IScheduleRequest,
  IScheduleResponse,
  ISchedulesResponse
}