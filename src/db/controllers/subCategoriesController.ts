import { Request, Response } from "express";
import { Category, Item, SubCategory } from "../models/index.js";



export const subCategoriesControllers = {
    subCategoryAndItems: async (req: Request, res: Response) => {
        try {

            const subCategoryId = req.params.id
            const { order, perPage, page } = req.query
            let pageNumber = 1
            let perPageNumber = 10

            if (typeof page === 'string') pageNumber = parseInt(page, 10)
            if (typeof perPage === 'string') perPageNumber = parseInt(perPage, 10)



            let orderQ: string[] = []

            if (typeof order === 'string') {
                orderQ = order.split('-')
            } else {
                orderQ = ['created_at', 'DESC']
            }


            const [subCategory, items] = await Promise.all(
                [
                    SubCategory.findOne({
                        where: { id: subCategoryId },
                        attributes: ['id', 'name', 'category_id'],
                    }),
                    Item.findAndCountAll({
                        where: { sub_category_id: subCategoryId },
                        limit: perPageNumber,
                        offset: (perPageNumber * (pageNumber - 1)),
                        order: [[orderQ[0], orderQ[1]]],
                        attributes: ['id', 'name', 'price', 'promotion', 'description', 'in_stock', 'thumbnail_url'],
                        include: [
                            {
                                association: 'ItemPromotion',
                                attributes: ['price']
                            }
                        ]
                    }),
                ]
            )


            const response = {
                id: subCategory!.id,
                name: subCategory!.name,
                Items: items.rows,
                countItems: items.count
            }

            res.status(200).json(response)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    }
}