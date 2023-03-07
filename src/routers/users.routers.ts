import { Router } from "express"
import {
  createUserController,
  listUserController,
  patchUserController,
  deleteUserController
} from "../controllers/users.controllers"
import { User } from "../entities"

import {
  ensureDataIsValidMiddleware,
  ensureTokenIsValidMiddleware,
  ensureUniqueEmailMiddleware,
  ensureUserIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureIsAuthorizedMiddleware
} from "../middlewares"
import { createUserSchema, updateUserSchema } from "../schemas"

const userRouters = Router()

// // POST	/users
// Criação de usuário
userRouters.post("", ensureDataIsValidMiddleware(createUserSchema), ensureUniqueEmailMiddleware, createUserController)
// // GET	/users
// Lista todos os usuários
userRouters.get("", ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, listUserController)
// // PATCH	/users
// Atualiza um usuário
userRouters.patch("/:id", ensureTokenIsValidMiddleware, ensureUserIsValidMiddleware, ensureIsAuthorizedMiddleware, ensureDataIsValidMiddleware(updateUserSchema), patchUserController)
// // DELETE	/users/:id
// Realiza um soft delete no usuário
userRouters.delete("/:id", ensureTokenIsValidMiddleware, ensureUserIsValidMiddleware, ensureIsAdminMiddleware, deleteUserController)

export default userRouters