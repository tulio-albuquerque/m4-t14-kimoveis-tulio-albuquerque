import { Router } from "express"
import {
  createCategoryController,
  listCategoriesController,
  listRealEstateByCategoryController,
} from "../controllers/categories.controllers"
import {
  ensureCategoryIsValidMiddleware,
  ensureDataIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureTokenIsValidMiddleware,
  ensureUniqueCategoryNameMiddleware
} from "../middlewares"
import { RealEstate } from "../entities"
import { createCategorySchema } from "../schemas/categories.schemas"

const categoriesRouters = Router()

// // POST	/categories
// Criação de categoria
categoriesRouters.post("", ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, ensureDataIsValidMiddleware(createCategorySchema), ensureUniqueCategoryNameMiddleware, createCategoryController)

// // GET	/categories
// Listar todas as categorias.
categoriesRouters.get("", listCategoriesController)

// // GET	/categories/:id/realEstate
// Lista todos imóveis que pertencem a uma categoria
categoriesRouters.get("/:id/realEstate", ensureCategoryIsValidMiddleware, listRealEstateByCategoryController)

export default categoriesRouters