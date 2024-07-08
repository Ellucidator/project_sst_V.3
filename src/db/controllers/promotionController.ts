import { Request, Response } from "express"
import {  ItemPromotion, Promotion } from "../models/index.js"
import { getPaginationParams } from "../../helpers/getPaginationParams.js"


export const promotionController = {
    getFeaturedPromotion: async(req:Request, res:Response)=>{
        try {

            const promotion = await Promotion.findOne({
                where:{featured:true},
                attributes:['id','name','description','thumbnail_url'],
            })

            if(promotion){
                const itemsPromotion = await ItemPromotion.findAll({
                    where:{ promotion_id:promotion.id},
                    limit:10,
                    include:[
                        {
                            association:'Item',
                            attributes: ['id', 'name', 'price','promotion', 'in_stock', 'thumbnail_url'],
                        }
                    ]
                })
                const promotionResponse = {
                    id:promotion.id,
                    name:promotion.name,
                    description:promotion.description,
                    thumbnail_url:promotion.thumbnail_url,
                    Items: itemsPromotion.map(item => {
                        return {
                            id: item.Item!.id,
                            name: item.Item!.name,
                            in_stock: item.Item!.in_stock,
                            thumbnail_url: item.Item!.thumbnail_url,
                            price: item.Item!.price,
                            promotion: item.Item!.promotion,
                            ItemPromotion: {
                                price: item.price
                            }
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
    },
    getPromotionByID:async(req:Request, res:Response)=>{
        try {

            const promotionId = req.params.id
            const [page, perPage] = getPaginationParams(req.query)
            const offset = (page - 1) * perPage

            
            const promotion = await Promotion.findOne({
                where:{id:promotionId},
                attributes:['id','name','description','thumbnail_url'],
                include:[
                    {
                        
                        association: 'Items',
                        through: { attributes: [] },
                        attributes: ['id', 'name', 'price','promotion', 'in_stock', 'thumbnail_url'],
                        include:[
                            {
                                association: 'ItemPromotion',
                                attributes: ['price']
                            }
                        ]
                    }
                ]
            })

            res.status(200).json(promotion)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}

