import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../error";
import { ICategoryCreate } from "../interfaces";

const ensureUniqueCategoryNameMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const categoryData: ICategoryCreate = req.body;
  
  const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category)
  
  const category = await categoryRepo.findOne({
    where: {
      name: categoryData.name
    }
  })

  if(category !== null) {
    throw new AppError("Category already exists", 409)
  }

  return next()
}

export default ensureUniqueCategoryNameMiddleware