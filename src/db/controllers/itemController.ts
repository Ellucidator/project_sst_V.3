import { Request, Response } from "express";
import { Item } from "../models/index.js";
import { itemServices } from "../services/itemServices.js";
import { getPaginationParams } from "../../helpers/getPaginationParams.js";


export const itemController = {

    highlighted: async (req: Request, res: Response) => {

        try {
            const itemsHighlighted = await Item.findAll(
                {
                    where: { featured: true }, 
                    attributes: ['id', 'name', 'price', 'description', 'in_stock', 'thumbnail_url', 'images'] 
                }
                )
            return res.json(itemsHighlighted)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
        }
    },

    newests: async (req: Request, res: Response) => {
        try {
            const newestsItems = await Item.findAll({
                attributes:['id', 'name', 'price', 'description', 'in_stock', 'thumbnail_url', 'images'],
                order:[['createdAt', 'DESC']],
                limit:10
            })
            return res.status(200).json(newestsItems)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },
    show: async (req: Request, res: Response) => {
        try {
            const itemId = req.params.id
            const item = await Item.findOne({ where: { id: itemId }, attributes: ['id', 'name', 'price', 'description', 'in_stock', 'promotion', 'thumbnail_url', 'images'] })

            return res.json(item)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },

    search: async (req: Request, res: Response) => {
        try {
            const { name } = req.query

            if (!name) return res.status(400).json({ error: 'name is required' })

            const items = await itemServices.findByName(name.toString())

            return res.json(items)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },

    fromSubCategory:async(req:Request, res:Response)=>{

        try {
            const [page, perPage] = getPaginationParams(req.query)
            const offset = (page - 1) * perPage

            const subCategoryId = req.params.id
            
            const items = await Item.findAndCountAll({
                where: { sub_category_id: subCategoryId },
                attributes: ['id', 'name', 'price', 'in_stock', 'thumbnail_url'],
                limit: perPage,
                offset: offset
            })
            return res.json(items)
        } catch (error) {
            
        }
    },

    updatePromotion:async(itemId:number)=>{
        
        try {
            const item = await Item.findOne({
                where:{id:itemId},
                include:[
                    {
                        association:'ItemPromotion'
                    }
                ]
            })
            if(item){
                if(item?.ItemPromotion){
                    item.promotion = true
                    await item.save()
                    return
                }
                item.promotion = false
                await item.save()
                return 
            }
            
            
        } catch (error) {
            if(error instanceof Error) {
                return error
            }
        }
    }
}