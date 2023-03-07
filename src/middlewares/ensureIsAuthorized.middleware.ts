import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

const ensureIsAuthorizedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authenticatedUser = req.user
  const userDataId = parseInt(req.params.id)

  if(authenticatedUser.admin === false &&
      authenticatedUser.id !== userDataId){
    throw new AppError("Insufficient permission", 403)
  }

  return next()
}

export default ensureIsAuthorizedMiddleware