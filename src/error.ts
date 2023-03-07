import { Request, Response, NextFunction } from "express"
import { EntityNotFoundError } from "typeorm"
import { ZodError } from "zod" 

class AppError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number = 400) {
    super(message)
    this.statusCode = statusCode
  }
}

class AppPatchError extends AppError {
  keys: Array<string>
  statusCode: number

  constructor(message: string, keys: Array<string>, statusCode: number = 400) {
    super(message, statusCode)
    this.keys = keys
  }
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(err instanceof AppPatchError) {
    return res.status(err.statusCode).json({
      message: err.message,
      keys: err.keys
    })
  }

  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  if(err instanceof EntityNotFoundError) {
    if(err.message.includes("Could not find any entity of type \"User\"")) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    if(err.message.includes("Could not find any entity of type \"RealEstate\"")) {
      return res.status(404).json({
        message: "RealEstate not found"
      })
    }
    console.log(err)
    return res.status(404).json({
      message: err.message
    })
  }

  if(err instanceof ZodError) {
    return res.status(400).json({
      message: err.flatten().fieldErrors,
    })
  }

  console.log(err)
  return res.status(500).json({
    message: "Internal Server Error."
  })
}

export { AppError, AppPatchError, errorHandler }