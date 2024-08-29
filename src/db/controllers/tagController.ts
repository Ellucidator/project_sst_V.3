import { Request, Response } from "express";
import { Item, SubCategory, Tag, TagValue } from "../models/index.js";
import { Op } from "sequelize";
import { sequelize } from "../index.js";

export const tagController = {
    getTagsWhereSubCategory: async (req: Request, res: Response) => {
        try {
            const subCategoryId = req.params.id
            const tags = await SubCategory.findOne({
                where: { id: subCategoryId },
                include: [
                    {
                        association: 'Tags',
                        attributes: ['id', 'name'],
                        through: { attributes: [] },
                        include: [
                            {
                                association: 'TagValues',
                                attributes: ['id', 'name']
                            }
                        ]
                    }
                ]
            })

            const response = tags?.Tags


            return res.status(200).json(response)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },

    getItemsByTagValue: async (req: Request, res: Response) => {
        try {
            const subCategoryId = req.params.id
            const tags: string[] = req.body.tags


            const { order, perPage, page } = req.query
            let pageNumber = 1
            let perPageNumber = 10

            if (typeof page === 'string') pageNumber = parseInt(page, 10)
            if (typeof perPage === 'string') perPageNumber = parseInt(perPage, 10)



            let orderQ: string[] = []

            if (typeof order === 'string') {
                orderQ = order.split('-')
            } else {
                orderQ = ['createdAt', 'DESC']
            }


            const [subCategory, items] = await Promise.all([
                SubCategory.findOne({
                    where: { id: subCategoryId },
                    attributes: ['id', 'name'],
                }),
                Item.findAll({
                    where:{sub_category_id:subCategoryId},
                    attributes: ['id', 'name', 'price', 'promotion', 'description', 'in_stock', 'thumbnail_url', 'createdAt', 'updatedAt'],
                    order: [[orderQ[0], orderQ[1]]],
                    limit: perPageNumber,
                    offset: (pageNumber - 1) * perPageNumber,
                    include: [
                        {
                            association: 'ItemPromotion',
                            attributes: ['price']
                        },
                        {
                            association: 'TagValues',
                            attributes: ['id', 'name'],
                            through: { attributes: [] },
                            required: true,
                            where: {
                                name: {
                                    [Op.in]: tags
                                }
                            },
                            
                        }
                    ],
                    having: sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM "tags_value"
                        INNER JOIN "items_tags_value"
                        ON "tags_value"."id" = "items_tags_value"."tag_value_id"
                        WHERE "items_tags_value"."item_id" = "Item"."id"
                        AND "tags_value"."name" IN (${tags.map(tag => `'${tag}'`).join(',')})
                    ) = ${tags.length}`),
                    group: ['Item.id']
                })

            ])

            const response = {
                id: subCategory!.id,
                name: subCategory!.name,
                Items: items,
                countItems: items.length
            }
            return res.status(200).json(response)


        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    }
}