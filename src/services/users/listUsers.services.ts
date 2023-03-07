import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { IUsersReturn } from '../../interfaces/users.interfaces'
import { returnMultipleUsersSchema } from '../../schemas'

const listUsersService = async (): Promise<IUsersReturn> => {
  const movieRepo: Repository<User> = AppDataSource.getRepository(User)

  const findMovies = await movieRepo.find()

  const movies: IUsersReturn = returnMultipleUsersSchema.parse(findMovies)

  return movies
}

export default listUsersService