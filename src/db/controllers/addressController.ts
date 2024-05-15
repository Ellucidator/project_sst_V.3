import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import { Address } from "../models/index.js";

export const addressController = {

    create: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const address = req.body
            await Address.create(address)

            return res.status(201)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },
}