import { Request, Response } from "express";
import { SubCategory } from "../models/index.js";
import { getPaginationParams } from "src/helpers/getPaginationParams.js";


export const subCategoriesControllers = {
    subCategoryAndItems: async (req:Request, res: Response)=>{
        try {
            const subCategoryId = req.params.id

            const [page, perPage] = getPaginationParams(req.query)
            const offset = (page - 1) * perPage

            const {count, rows} = await SubCategory.findAndCountAll({where: {id:subCategoryId},attributes: ['id', 'name'],include:{association:'Items',attributes: ['id', 'name', 'price', 'thumbnail_url']},limit:perPage,offset})

            return res.json({count, rows, page, perPage})

        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}