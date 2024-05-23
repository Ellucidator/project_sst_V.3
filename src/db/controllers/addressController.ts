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
    delete: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const { id } = req.params

            await Address.destroy({ where: { id } })

            return res.status(204).json('Address deleted')

        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },

    listByUserId: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user!.id

            const addresses = await Address.findAll({
                where: {user_id: userId},
                order: [['created_at', 'DESC']],
            })

            return res.status(200).json(addresses)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
            
        }
    }
}