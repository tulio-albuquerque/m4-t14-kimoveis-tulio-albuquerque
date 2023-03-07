import { z } from "zod"
import { returnMultipleRealEstateOnlySchema, returnRealEstateOnlySchema } from "./realEstate.schemas"

const createCategorySchema = z.object({
  name: z.string().max(45)
})

const returnCategorySchema = createCategorySchema.extend({
  id: z.number()
})

const returnCategoryWithRealEstateSchema = returnCategorySchema.extend({
  realEstate: returnMultipleRealEstateOnlySchema
})

const returnMultipleCategoriesSchema = returnCategorySchema.array()

export {
  createCategorySchema,
  returnCategorySchema,
  returnCategoryWithRealEstateSchema,
  returnMultipleCategoriesSchema
}