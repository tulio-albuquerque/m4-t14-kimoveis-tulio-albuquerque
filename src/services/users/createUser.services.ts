import { IUserRequest, IUserReturn } from "../../interfaces"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { Repository } from "typeorm"
import { returnUserWithoutPasswordSchema } from "../../schemas/users.schemas"

const createUserService = async (userData: IUserRequest): Promise<IUserReturn> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User)

  const user = userRepo.create(userData)

  await userRepo.save(user)

  const newUser = returnUserWithoutPasswordSchema.parse(user)
  return newUser
}

export default createUserService