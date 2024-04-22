import { Request, Response } from "express";
import { SubCategory, Tag, TagValue } from "../models/index.js";

export const tagController = {
    getTagsWhereSubCategory: async (req:Request,res:Response) => {
        try {
            const subCategoryId = req.params.id
            const tags = await SubCategory.findOne({
                where: { id: subCategoryId },
                include:[
                    {
                        association:'Tags',
                        attributes:['id','name'],
                        through:{attributes:[]},
                        include:[
                            {
                                association:'TagValues',
                                attributes:['id','name']
                            }
                        ]
                    }
                ]
            })

            const response = tags?.Tags


            return res.status(200).json(response)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },

    getItemsByTagValue:async (req:Request,res:Response) => {
        try {
            const tagValueId = req.params.id

            const items = await TagValue.findOne({
                where: { id: tagValueId },
                include:[
                    {
                        association:'Items',
                        attributes:['id','name','price','promotion', 'description', 'in_stock', 'thumbnail_url'],
                        through:{attributes:[]},
                        include:[
                            {
                                association:'ItemPromotion',
                                attributes:['price']
                            }
                        ]
                    }
                ]
            })


            return res.status(200).json(items)


        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}