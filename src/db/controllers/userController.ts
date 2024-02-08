import { Request, Response } from "express";
import { User } from "../models/index.js";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import { userServices } from "../services/userServices.js";


export const userController = {

    show:async (req:Request,res:Response)=>{

        try {
            const userId = req.params.id

            const user = await User.findOne({where: {id: userId}})

            return res.json(user)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },

    favorites:async(req:AuthenticatedRequest,res:Response)=>{
        try {
            
            const userId = req.user!.id
            const favorites = userServices.favorites(userId)

            return res.json(favorites)

        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}