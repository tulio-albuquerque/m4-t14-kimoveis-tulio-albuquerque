import { Router } from "express"
import {
  createRealStateController,
  listRealStateController
} from "../controllers/realEstate.controllers"

import { ensureDataIsValidMiddleware, ensureIsAdminMiddleware, ensureTokenIsValidMiddleware, ensureUniqueAddressMiddleware } from "../middlewares"
import { createRealEstateSchema } from "../schemas"

const realEstateRouters = Router()

// // POST	/realEstate
// Criação de um imóvel
realEstateRouters.post("", ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, ensureDataIsValidMiddleware(createRealEstateSchema), ensureUniqueAddressMiddleware, createRealStateController)
// // GET	/realEstate
// Lista todos os imóveis
realEstateRouters.get("", listRealStateController)

export default realEstateRouters