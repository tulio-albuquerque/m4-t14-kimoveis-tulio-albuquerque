import { IUserUpdate, IUserReturn } from "../../interfaces"
import { AppDataSource } from "../../data-source"
import User from "../../entities/users.entity"
import { Repository } from "typeorm"
import { returnUserWithoutPasswordSchema } from "../../schemas/users.schemas"

const patchUserService = async (userId: number, newUserData: IUserUpdate): Promise<IUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User)

  const oldUserData = await userRepository.findOneBy({
    id: userId
  })

  const user = userRepository.create({
    ...oldUserData,
    ...newUserData
  })

  await userRepository.save(user)

  const updatedUser = returnUserWithoutPasswordSchema.parse(user)

  return updatedUser
}

export default patchUserService