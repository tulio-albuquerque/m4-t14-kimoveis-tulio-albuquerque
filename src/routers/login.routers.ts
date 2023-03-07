import { Router } from "express"
import { createLoginController } from "../controllers/login.controllers"
import { ensureDataIsValidMiddleware } from "../middlewares"
import { createLoginSchema } from "../schemas/login.schemas"

const loginRouters = Router()

// // POST	/login
// Gera o token de autenticação
loginRouters.post("", ensureDataIsValidMiddleware(createLoginSchema), createLoginController)

export default loginRouters