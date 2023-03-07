import { Request, Response } from "express"
import { IRealEstateRequest } from "../interfaces";
import createRealEstateService from "../services/realEstate/createRealEstate.services";
import listRealEstateService from "../services/realEstate/listRealEstate.services";

// // POST	/realEstate
// Criação de um imóvel
const createRealStateController = async (req: Request, res: Response): Promise<Response> => {
  const realEstateData: IRealEstateRequest = req.body

  const newRealEstate = await createRealEstateService(realEstateData)

  return res.status(201).json(newRealEstate)
}

// // GET	/realEstate
// Lista todos os imóveis
const listRealStateController = async (req: Request, res: Response): Promise<Response> => {
  const realEstateData = await listRealEstateService()

  return res.status(200).json(realEstateData)
}

export {
  createRealStateController,
  listRealStateController
}