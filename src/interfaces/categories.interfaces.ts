import { z } from "zod"
import { createCategorySchema, returnCategorySchema, returnCategoryWithRealEstateSchema, returnMultipleCategoriesSchema } from "../schemas/categories.schemas"

type ICategoryCreate = z.infer<typeof createCategorySchema>
type ICategoryReturn = z.infer<typeof returnCategorySchema>
type ICategoriesWithRealEstateReturn = z.infer<typeof returnCategoryWithRealEstateSchema>
type ICategoriesReturn = z.infer<typeof returnMultipleCategoriesSchema>

export {
  ICategoryCreate,
  ICategoryReturn,
  ICategoriesWithRealEstateReturn,
  ICategoriesReturn
}