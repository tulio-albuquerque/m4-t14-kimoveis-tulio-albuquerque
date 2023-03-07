import { z } from "zod"
import { returnRealEstateSchema } from "./realEstate.schemas"
import { returnUserSchema } from "./users.schemas"

const scheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
})

const createScheduleSchema = scheduleSchema.extend({
  realEstateId: z.number()
})

const returnScheduleSchema = scheduleSchema.extend({
  id: z.number(),
  user: returnUserSchema,
  realEstate: returnRealEstateSchema
})

const returnScheduleOnlySchema = returnScheduleSchema.omit({
  realEstate: true
})

const returnMultipleSchedulesSchema = returnScheduleSchema.array()

const returnMultipleSchedulesOnlySchema = returnScheduleOnlySchema.array()

export {
  createScheduleSchema,
  returnScheduleSchema,
  returnMultipleSchedulesSchema,
  returnMultipleSchedulesOnlySchema
}