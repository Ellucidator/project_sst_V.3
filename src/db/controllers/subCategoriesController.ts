import { Request, Response } from "express";
import { Category, Item, SubCategory } from "../models/index.js";
import { Op } from "sequelize";
import { sequelize } from "../index.js";


export const subCategoriesControllers = {
    subCategoryAndItems: async (req: Request, res: Response) => {
        try {

            const subCategoryId = req.params.id
            const {order,perPage,page} = req.query
            let pageNumber = 1
            let perPageNumber = 10

            if(typeof page === 'string') pageNumber = parseInt(page, 10)
            if(typeof perPage === 'string') perPageNumber = parseInt(perPage, 10)



            let orderQ:string[]=[]

            if (typeof order === 'string'){
                orderQ = order.split('-')
            }else{
                orderQ = ['created_at', 'DESC']
            }
            
            console.log(orderQ)
            


            const subCategory = await SubCategory.findOne({
                where: { id: subCategoryId },
                attributes: ['id', 'name', 'category_id'],
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
                                    OFFSET ${(perPageNumber * (pageNumber - 1))}
                                    LIMIT ${perPageNumber}
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
            const category = await Category.findOne({
                where:{id:subCategory!.category_id},
                attributes:['name']
            })

            const response = {
                id:subCategory!.id,
                name:subCategory!.name,
                category_name: category!.name,
                Items:subCategory?.Items
            }

            console.log(response)
            res.json(response)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    }
}