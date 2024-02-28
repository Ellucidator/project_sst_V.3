import { Request, Response } from "express";
import { SubCategory } from "../models/index.js";


export const subCategoriesControllers = {
    subCategoryAndItems: async (req:Request, res: Response)=>{
        try {
            const subCategoryId = req.params.id

            const subCategory = await SubCategory.findOne({where: {id:subCategoryId},attributes: ['id', 'name'],include:{association:'Items',attributes: ['id', 'name', 'price', 'thumbnail_url']}})

            return res.json(subCategory)

        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}