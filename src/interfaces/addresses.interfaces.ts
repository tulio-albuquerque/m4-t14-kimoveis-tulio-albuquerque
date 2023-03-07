import { z } from "zod"
import { createAddressSchema, returnAddressSchema } from "../schemas"

type IAddressRequest = z.infer<typeof createAddressSchema>
type IAddressResponse = z.infer<typeof returnAddressSchema>

export {
  IAddressRequest,
  IAddressResponse,
}