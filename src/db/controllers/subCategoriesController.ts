import { Request, Response } from "express";
import { Item, SubCategory } from "../models/index.js";
import { Op } from "sequelize";
import { sequelize } from "../index.js";


export const subCategoriesControllers = {
    subCategoryAndItems: async (req: Request, res: Response) => {
        try {

            const subCategoryId = req.params.id
            const {order} = req.query

            let orderQ:string[]=[]

            if (typeof order === 'string'){
                orderQ = order.split('-')
            }else{
                orderQ = ['created_at', 'DESC']
            }
            
            console.log(orderQ)
            


            const subCategory = await SubCategory.findOne({
                where: { id: subCategoryId },
                attributes: ['id', 'name'],
                include: [{
                    association: 'Items',
                    attributes: ['id', 'name', 'price', 'promotion', 'description', 'in_stock', 'thumbnail_url'],
                    where: {
                        id: {
                            [Op.in]: [
                                sequelize.literal(`(
                                    SELECT id
                                    FROM items
                                    WHERE sub_category_id = ${subCategoryId}
                                    OFFSET ${0}
                                    LIMIT ${10}
                                    )`)
                            ]
                        }
                    },
                    separate:true,
                    order:[[orderQ[0], orderQ[1]]],
                    include: [{
                        association: 'ItemPromotion',
                        attributes: ['price']
                    }]
                }],

            })
            console.log(subCategory?.Items)
            res.json(subCategory)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    }
}