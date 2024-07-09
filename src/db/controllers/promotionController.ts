import { Request, Response } from "express"
import {  Item, ItemPromotion, Promotion } from "../models/index.js"
import { getPaginationParams } from "../../helpers/getPaginationParams.js"
import { sequelize } from "../index.js"
import { Op } from "sequelize"


export const promotionController = {
    getFeaturedPromotion: async(req:Request, res:Response)=>{
        try {

            const promotion = await Promotion.findOne({
                where:{featured:true},
                attributes:['id','name','description','thumbnail_url'],
            })

            if(promotion){
                const itemsPromotion = await Item.findAll({
                    where: {
                        id: {
                            [Op.in]: sequelize.literal(`
                                (SELECT "item_id"
                                FROM "items_promotion"
                                WHERE "promotion_id" = ${promotion.id})
    
                            `)
                        }
                    },
                    attributes: ['id', 'name', 'price', 'in_stock', 'promotion', 'thumbnail_url'],
                    include: [
                        {
                            model: ItemPromotion,
                            as: 'ItemPromotion',
                            attributes: ['price']
                        }
                    ],
                    limit: 10
                })

                const promotionResponse = {
                    id:promotion.id,
                    name:promotion.name,
                    description:promotion.description,
                    thumbnail_url:promotion.thumbnail_url,
                    Items: itemsPromotion
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

            const [promotion, items] = await Promise.all([
                Promotion.findOne({
                    where:{id:promotionId},
                    attributes:['id','name','description','thumbnail_url'],
                }),
                Item.findAll({
                    where: {
                        id: {
                            [Op.in]: sequelize.literal(`
                                (SELECT "item_id"
                                FROM "items_promotion"
                                WHERE "promotion_id" = ${promotionId})
    
                            `)
                        }
                    },
                    attributes: ['id', 'name', 'price', 'in_stock', 'promotion', 'thumbnail_url'],
                    include: [
                        {
                            model: ItemPromotion,
                            as: 'ItemPromotion',
                            attributes: ['price']
                        }
                    ],
                    limit: perPage,
                    offset: offset,
                    order: [[{ model: ItemPromotion, as: 'ItemPromotion' }, 'price', 'ASC']]
                })
            ])

            res.status(200).json({
                id:promotion!.id,
                name:promotion!.name,
                description:promotion!.description,
                thumbnail_url:promotion!.thumbnail_url,
                Items: items
            })
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}

