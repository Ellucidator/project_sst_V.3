import { Request, Response } from "express"
import { Item, ItemPromotion, Promotion } from "../models/index.js"
import { getPaginationParams } from "../../helpers/getPaginationParams.js"
import { sequelize } from "../index.js"
import { Op } from "sequelize"
import { Literal } from "sequelize/lib/utils"

function sequelizeLiteral(idParam: number | string): { [Op.in]: Literal } {
    return {
        [Op.in]: sequelize.literal(`
            (SELECT "item_id"
            FROM "items_promotion"
            WHERE "promotion_id" = ${idParam})

        `)
    }
}
export const promotionController = {
    getFeaturedPromotion: async (req: Request, res: Response) => {
        try {

            const promotion = await Promotion.findOne({
                where: { featured: true },
                attributes: ['id', 'name', 'description', 'thumbnail_url'],
            })

            if (promotion) {
                const itemsPromotion = await Item.findAll({
                    where: {
                        id: sequelizeLiteral(promotion.id)
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
                    id: promotion.id,
                    name: promotion.name,
                    description: promotion.description,
                    thumbnail_url: promotion.thumbnail_url,
                    Items: itemsPromotion
                }

                return res.status(200).json(promotionResponse)
            } else {
                return res.status(404).json({ error: 'Promotion not found' })
            }

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },
    getPromotionByID: async (req: Request, res: Response) => {
        try {

            const promotionId = req.params.id
            const { subCategoryId } = req.query
            const [perPage, offset, order] = getPaginationParams(req.query)



            const conditions = typeof subCategoryId === 'string'&& subCategoryId!=='all'
                ? {
                    sub_category_id: parseInt(subCategoryId),
                    id: sequelizeLiteral(promotionId)
                }
                : { id: sequelizeLiteral(promotionId) }

            const [promotion, items] = await Promise.all([
                Promotion.findOne({
                    where: { id: promotionId },
                    attributes: ['id', 'name', 'description', 'thumbnail_url'],
                }),
                Item.findAndCountAll({
                    where: conditions,
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
                    order: [[{ model: ItemPromotion, as: 'ItemPromotion' }, order[0], order[1]]],
                })
            ])

            res.status(200).json({
                id: promotion!.id,
                name: promotion!.name,
                description: promotion!.description,
                thumbnail_url: promotion!.thumbnail_url,
                Items: items.rows,
                countItems: items.count
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },

    getAllPromotions: async (req: Request, res: Response) => {
        try {
            const promotion = await Promotion.findAll({
                attributes: ['id', 'name', 'description', 'thumbnail_url'],
            })
            
            return res.status(200).json(promotion)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    }
}

