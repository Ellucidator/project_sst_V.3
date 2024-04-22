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
            const tags:string[] = req.body.tags

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


            const [subCategory,items]= await Promise.all([
                SubCategory.findOne({
                    where: { id: subCategoryId },
                    attributes: ['id', 'name'],
                }),
                Item.findAll({
                    where: { sub_category_id: subCategoryId},
                    attributes:['id', 'name', 'price','promotion', 'description', 'in_stock', 'thumbnail_url'],
                    order:[[orderQ[0],orderQ[1]]],
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
            ])


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
            const itemsPaginated = itemsFiltred.slice((pageNumber-1)*perPageNumber,pageNumber*perPageNumber)

            const response = {
                id: subCategory!.id,
                name: subCategory!.name,
                Items: itemsPaginated,
                countItems: itemsFiltred.length
            }
            return res.status(200).json(response)


        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}