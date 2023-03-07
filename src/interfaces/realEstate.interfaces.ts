import { z } from "zod"
import { createRealEstateSchema, returnMultipleRealEstateSchema, returnRealEstateSchema, returnRealEstateWithSchedulesSchema } from "../schemas/realEstate.schemas"

type IRealEstateRequest = z.infer<typeof createRealEstateSchema>
type IRealEstateResponse = z.infer<typeof returnRealEstateSchema>
type IRealEstateWithSchedulesResponse = z.infer<typeof returnRealEstateWithSchedulesSchema>
type IRealEstatesResponse = z.infer<typeof returnMultipleRealEstateSchema>

export {
  IRealEstateRequest,
  IRealEstateResponse,
  IRealEstateWithSchedulesResponse,
  IRealEstatesResponse
}