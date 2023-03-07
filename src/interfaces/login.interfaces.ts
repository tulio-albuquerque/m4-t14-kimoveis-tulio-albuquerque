import { z } from "zod"
import { createLoginSchema } from "../schemas/login.schemas"

type ILoginCreate = z.infer<typeof createLoginSchema>

export {
  ILoginCreate
}