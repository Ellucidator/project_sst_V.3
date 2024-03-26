import { Request, Response } from "express";
import { Category } from "../models/index.js";
import { ItemInstance } from "../models/Item.js";


export const categoriesController = {

    list: async (req:Request,res:Response) => {
        try {
            const categories = await Category.findAll({
                order: [['position', 'ASC']],
                attributes: ['id', 'name'],
                include:{
                    association:'SubCategories',
                    attributes: ['id', 'name'],
                    
                }});
            return res.json(categories)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },

    getOneCategoryAndSubCategories: async (req:Request,res:Response) => {
        try {
            const categoryId = req.params.id
            const category = await Category.findOne({
                where: {id: categoryId},
                attributes:['id','name'],
                include:[
                    {
                        association:'SubCategories',
                        attributes:['id','name'],
                        include:[
                            {
                                association:'Items',
                                attributes:['id', 'name', 'price','promotion', 'description', 'in_stock', 'thumbnail_url'],
                                include:[{
                                    association:'ItemPromotion',
                                    attributes: ['price']
                                }]
                            }
                        ]
                    }
                ]
            })
            if(!category) return
            const Items:ItemInstance[]= []

            category.SubCategories?.forEach((subCategory)=>{
                subCategory.Items?.forEach((item)=>{Items.push(item)})
                
            })

            const categoryRes = {
                id:category.id,
                name:category.name,
                Items
            }

            return res.json(categoryRes)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}