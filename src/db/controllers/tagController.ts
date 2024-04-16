import { Request, Response } from "express";
import { SubCategory, Tag } from "../models/index.js";

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
    }
}