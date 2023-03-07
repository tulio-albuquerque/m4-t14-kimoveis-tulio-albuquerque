import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../error";
import { IUserRequest } from "../interfaces";

const ensureUniqueEmailMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const userData: IUserRequest = req.body;
  
  const userRepo: Repository<User> = AppDataSource.getRepository(User)
  
  const user = await userRepo.findOne({
    where: {
      email: userData.email
    }
  })

  if(user !== null) {
    throw new AppError("Email already exists", 409)
  }

  return next()
}

export default ensureUniqueEmailMiddleware