import { Request, Response } from "express";
import { Category } from "../models/index.js";


export const categoriesController = {

    list: async (req:Request,res:Response) => {
        try {
            const categories = await Category.findAll({order: [['position', 'ASC']]});
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
            const category = await Category.findOne({where: {id: categoryId},include:{association:'SubCategories'}})
            return res.json(category)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}