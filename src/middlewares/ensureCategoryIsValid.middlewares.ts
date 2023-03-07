import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../error";

const ensureCategoryIsValidMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const categoryId: number = parseInt(req.params.id);
  
  const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category)
  
  const category = await categoryRepo.findOneBy({ id: categoryId })

  if(category === null) {
    throw new AppError("Category not found", 404)
  }
  
  return next()
}

export default ensureCategoryIsValidMiddleware