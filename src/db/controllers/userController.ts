import { Request, Response } from "express";
import {  User } from "../models/index.js";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import { userServices } from "../services/userServices.js";


export const userController = {

    show:async (req:AuthenticatedRequest,res:Response)=>{

        try {
            const userId = req.user!.id

            const user = await User.findOne({where: {id: userId}, attributes: ['id', 'email', 'username', 'first_name', 'last_name', 'phone', 'birth','img_key']})

            return res.json(user)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },

    showFavorites:async(req:AuthenticatedRequest,res:Response)=>{
        try {
            const userId = req.user!.id
            const favorites = await userServices.favorites(userId)

            return res.json(favorites)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },

    addFavorite:async(req:AuthenticatedRequest,res:Response)=>{

        try {
            const userId = req.user!.id
            const itemId = req.body.itemId

            const favorite = await userServices.addFavorite(userId, itemId)

            return res.json(favorite)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },

    deleteFavorite:async(req:AuthenticatedRequest,res:Response)=>{

        try {
            
            const userId = req.user!.id
            const itemId = req.body.itemId

            await userServices.deleteFavorite(userId, itemId)

            return res.status(204).json('Favorite deleted')

        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }

}