import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address } from "../entities";
import { AppError } from "../error";
import { IRealEstateRequest } from "../interfaces";

const ensureUniqueAddressMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const realEstateData: IRealEstateRequest = req.body;
  
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address)
  
  const address = await addressRepo.findOne({
    where: {
      zipCode: realEstateData.address.zipCode,
      number: realEstateData.address.number || "0"
    }
  })

  if(address !== null) {
    throw new AppError("Address already exists", 409)
  }

  return next()
}

export default ensureUniqueAddressMiddleware