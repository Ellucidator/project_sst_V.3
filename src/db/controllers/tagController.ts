import { Request, Response } from "express";
import { Item, SubCategory, Tag, TagValue } from "../models/index.js";

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
            const subCategoryId = req.params.id
            const tags:string[] = req.body
            

            const items = await Item.findAll({
                where: { sub_category_id: subCategoryId},
                attributes:['id', 'name', 'price','promotion', 'description', 'in_stock', 'thumbnail_url'],
                include:[
                    {
                        association:'ItemPromotion',
                        attributes:['price']
                    },
                    {
                        association:'TagValues',
                        attributes:['name'],
                        through:{attributes:[]},
                    }
                ]
            })

            const itemsFiltred = items.filter(item => {
                let validate = 0
                for (let i = 0; i < tags.length; i++) {
                    if(item.TagValues!.some(tag => tag.name === tags[i])){
                        validate++
                    }
                }
                if(validate === tags.length){
                    return item
                }

            })

            return res.status(200).json(itemsFiltred)


        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}