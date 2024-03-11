import { Request, Response } from "express"
import {  Promotion } from "../models/index.js"
import { getPaginationParams } from "../../helpers/getPaginationParams.js"
import { PromotionInstance } from "../models/Promotion.js"


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
    },
    getItemsPromotion:async(req:Request, res:Response)=>{
        try {
            const promotionId = req.params.id
            const [page, perPage] = getPaginationParams(req.query)
            const offset = (page - 1) * perPage
            const promotion:PromotionInstance|null = await Promotion.findOne({
                where:{id:promotionId},
                attributes:['id','name','description','thumbnail_url'],
                include:[
                    {
                        association:'Items',
                        attributes: ['id', 'name', 'price', 'in_stock', 'thumbnail_url'],
                    }
                ]
            })
            if(promotion){
                const promotionResponse = {
                    id:promotion.id,
                    name:promotion.name,
                    description:promotion.description,
                    thumbnail_url:promotion.thumbnail_url,
                    items: promotion.Items?.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            pricePromotion: item.ItemPromotion!.price,
                            in_stock: item.in_stock,
                            thumbnail_url: item.thumbnail_url
                        }
                    })
                }

                return res.status(200).json(promotionResponse)
            }

        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}

