import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { IUsersReturn } from '../../interfaces/users.interfaces'
import { returnMultipleUsersSchema } from '../../schemas'

const listUsersService = async (): Promise<IUsersReturn> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User)

  const findUser = await userRepo.find()

  const users: IUsersReturn = returnMultipleUsersSchema.parse(findUser)

  return users
}

export default listUsersService