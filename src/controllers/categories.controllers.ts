import { Request, Response } from "express"
import { ICategoryCreate } from "../interfaces"
import createCategoryService from "../services/categories/createCategory.services"
import listCategoriesService from "../services/categories/listCategories.services"
import listRealEstateByCategory from "../services/categories/listRealEstateByCategory.services"

// // POST	/categories
// Criação de categoria
const createCategoryController = async (req: Request, res: Response): Promise<Response> => {
  const categoryData: ICategoryCreate = req.body

  const newCategory = await createCategoryService(categoryData)

  return res.status(201).json(newCategory)
}

// // GET	/categories/:id/realEstate
// Lista todos imóveis que pertencem a uma categoria
const listCategoriesController = async (req: Request, res: Response): Promise<Response> => {
  const categoryId: number = parseInt(req.params.id)
  
  const realEstate = await listCategoriesService(categoryId)

  return res.status(200).json(realEstate)
}


// // GET	/categories/:id/realEstate
// Lista todos imóveis que pertencem a uma categoria
const listRealEstateByCategoryController = async (req: Request, res: Response): Promise<Response> => {
  const categoryId: number = parseInt(req.params.id)
  
  const realEstate = await listRealEstateByCategory(categoryId)

  return res.status(200).json(realEstate)
}

export {
  createCategoryController,
  listCategoriesController,
  listRealEstateByCategoryController
}