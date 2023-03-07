import { z } from "zod"
import { createAddressSchema, returnAddressSchema } from "./addresses.schemas"
import { returnCategorySchema } from "./categories.schemas"
import { returnMultipleSchedulesOnlySchema } from "./schedules.schemas"

const realEstateSchema = z.object({
  sold: z.boolean().optional().default(false),
  value: z.number().or(z.string()),
  size: z.number().int().gt(0),
})

const createRealEstateSchema = realEstateSchema.extend({
  address: createAddressSchema,
  categoryId: z.number(),
})


const returnRealEstateOnlySchema = realEstateSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
})

const returnRealEstateSchema = returnRealEstateOnlySchema.extend({
  address: returnAddressSchema,
  category: returnCategorySchema.nullish()
})

const returnRealEstateWithSchedulesSchema = returnRealEstateSchema.extend({
  schedules: returnMultipleSchedulesOnlySchema
})

const returnMultipleRealEstateSchema = returnRealEstateSchema.array()

const returnMultipleRealEstateOnlySchema = returnRealEstateOnlySchema.array()

export {
  createRealEstateSchema,
  returnRealEstateSchema,
  returnRealEstateOnlySchema,
  returnRealEstateWithSchedulesSchema,
  returnMultipleRealEstateSchema,
  returnMultipleRealEstateOnlySchema
}