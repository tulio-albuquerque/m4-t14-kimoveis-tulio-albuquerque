import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { Repository } from "typeorm"
import { ILoginCreate } from "../../interfaces"
import { AppError } from "../../error"
import { compare } from "bcryptjs"

import jwt from 'jsonwebtoken'
import 'dotenv/config'

const createLoginService = async (loginData: ILoginCreate): Promise<string> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User)

  const user = await userRepo.findOneBy({ email: loginData.email})

  if(user === null){ // ?
    throw new AppError("Invalid credentials", 401)
  }

  const matchPassword: boolean = await compare(loginData.password, user.password)
  if(!matchPassword){
    throw new AppError("Invalid credentials", 401)
  }

  const token = jwt.sign(
    {
      admin: user.admin
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: user.id.toString()
    }
  )

  return token
}

export default createLoginService