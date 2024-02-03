import { Request, Response } from "express";
import { Category, SubCategory } from "../models/index.js";


export const categoriesController = {

    list: async (req:Request,res:Response) => {
        try {
            const categories = await Category.findAll({order: [['position', 'ASC']]});
            return res.json(categories)
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message)
            }
        }
    },

    getOneCategoryAndSubCategories: async (req:Request,res:Response) => {
        try {
            const categoryId = req.params.id
            const category = await Category.findOne({where: {id: categoryId},include:{model:SubCategory}})
            return res.json(category)
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message)
            }
        }
    }
}