import { Request, Response } from "express";
import { Item, SubCategory } from "../models/index.js";
import { Op } from "sequelize";
import { sequelize } from "../index.js";


export const subCategoriesControllers = {
    subCategoryAndItems: async (req: Request, res: Response) => {
        try {

            const subCategoryId = req.params.id
            const subCategory = await SubCategory.findOne({
                where: { id: subCategoryId },
                attributes: ['id', 'name'],
                include: [{
                    model: Item,
                    attributes: ['id', 'name', 'price', 'promotion', 'description', 'in_stock', 'thumbnail_url'],
                    where: {
                        id: {
                            [Op.in]: [
                                sequelize.literal(`(
                                    SELECT id
                                    FROM items
                                    WHERE sub_category_id = ${subCategoryId}
                                    ORDER BY created_at DESC
                                    OFFSET ${0}
                                    LIMIT ${10}
                                    )`)
                            ]
                        }
                    },
                    include: [{
                        association: 'ItemPromotion',
                        attributes: ['price']
                    }]
                }],

            })
            if (!subCategory) return res.status(404).json({ error: 'subCategory not found' })

            const subCategoryRes = {
                id: subCategory.id,
                name: subCategory.name,
                items: subCategory.Items?.map(item => {
                    if (item.ItemPromotion) {
                        return {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            in_stock: item.in_stock,
                            thumbnail_url: item.thumbnail_url,
                            description: item.description,
                            promotion: item.promotion,
                            price_promotion: item.ItemPromotion.price
                        }
                    } else {
                        return {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            in_stock: item.in_stock,
                            thumbnail_url: item.thumbnail_url,
                            description: item.description,
                            promotion: item.promotion
                        }
                    }
                })
            }
            res.json(subCategoryRes)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    }
}