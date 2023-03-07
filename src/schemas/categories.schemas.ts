import { z } from "zod"
import { returnRealEstateOnlySchema } from "./realEstate.schemas"

const createCategorySchema = z.object({
  name: z.string().max(45)
})

const returnCategorySchema = createCategorySchema.extend({
  id: z.number()
})

const returnCategoryWithRealEstateSchema = returnCategorySchema.extend({
  realEstate: z.array(returnRealEstateOnlySchema)
})

const returnMultipleCategoriesSchema = returnCategorySchema.array()

export {
  createCategorySchema,
  returnCategorySchema,
  returnCategoryWithRealEstateSchema,
  returnMultipleCategoriesSchema
}