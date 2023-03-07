import { Request, Response } from "express"
import { IUserRequest, IUserUpdate } from "../interfaces"
import createUserService from "../services/users/createUser.services"
import listUsersService from "../services/users/listUsers.services"
import patchUserService from "../services/users/patchUser.services"
import deleteUserService from "../services/users/deleteUser.services"

// // POST	/users
// Criação de usuário
const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const userData: IUserRequest = req.body

  const newUser = await createUserService(userData)

  return res.status(201).json(newUser)
}

// // GET	/users
// Lista todos os usuários
const listUserController = async (req: Request, res: Response): Promise<Response> => {
  const usersData = await listUsersService()

  return res.status(200).json(usersData)
}

// // PATCH	/users
// Atualiza um usuário
const patchUserController = async (req: Request, res: Response): Promise<Response> => {
  const userId = parseInt(req.params.id);
  const userData: IUserUpdate = req.body;

  const updatedUserData = await patchUserService(userId, userData)

  return res.status(200).json(updatedUserData)
}

// // DELETE	/users/:id
// Realiza um soft delete no usuário
const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
  const userId = parseInt(req.params.id);
 
  await deleteUserService(userId)

  return res.status(204).send()
}

export {
  createUserController,
  listUserController,
  patchUserController,
  deleteUserController
}