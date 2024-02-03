import { Request, Response } from "express";
import { Category } from "../models/index.js";


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
    }
}