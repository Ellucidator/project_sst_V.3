import { Request, Response } from "express";
import { User } from "../models/index.js";


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
    }
}