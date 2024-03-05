import { Request, Response } from "express"
import { Promotion } from "../models/index.js"


export const promotionController = {
    getFeaturedPromotion: async(req:Request, res:Response)=>{
        try {
            const promotion = await Promotion.findOne({where:{featured:true}})

            return res.status(200).json(promotion)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}

