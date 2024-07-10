import { Request, Response } from "express";
import { Category, Item, SubCategory } from "../models/index.js";
import { getPaginationParams } from "../../helpers/getPaginationParams.js";



export const subCategoriesControllers = {

    getAllSubCategories: async (req: Request, res: Response) => {
        try {
            const subCategories = await SubCategory.findAll({
                attributes: ['id', 'name'],
            })

            return res.status(200).json(subCategories)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },
    subCategoryAndItems: async (req: Request, res: Response) => {
        try {

            const subCategoryId = req.params.id
            const [perPage, offset, order] = getPaginationParams(req.query)

            const [subCategory, items] = await Promise.all(
                [
                    SubCategory.findOne({
                        where: { id: subCategoryId },
                        attributes: ['id', 'name', 'category_id'],
                    }),
                    Item.findAndCountAll({
                        where: { sub_category_id: subCategoryId },
                        limit: perPage,
                        offset: offset,
                        order: [[order[0], order[1]]],
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