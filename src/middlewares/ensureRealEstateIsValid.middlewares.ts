import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RealEstate, User } from "../entities";
import { AppError } from "../error";

const ensureRealEstateIsValidMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const realEstateId: number = parseInt(req.params.id) || req.body.realEstateId;
  
  const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
  
  const realEstate = await realEstateRepo.findOneBy({ id: realEstateId })

  if(realEstate === null) {
    throw new AppError("RealEstate not found", 404)
  }
  
  return next()
}

export default ensureRealEstateIsValidMiddleware