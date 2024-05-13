import { Request, Response } from "express";
import { Item, ItemCharacteristics } from "../models/index.js";
import { itemServices } from "../services/itemServices.js";
import { getPaginationParams } from "../../helpers/getPaginationParams.js";
import { Op } from "sequelize";


export const itemController = {

    highlighted: async (req: Request, res: Response) => {

        try {
            const highlighted = await Item.findAll({
                where: { featured: true },
                attributes: ['id', 'name', 'price', 'promotion', 'description', 'in_stock', 'thumbnail_url'],
                include: [
                    {
                        association: 'ItemPromotion',
                        attributes: ['price']
                    }
                ],
                order: [['createdAt', 'DESC']],
            })

            return res.json(highlighted)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
        }
    },

    newests: async (req: Request, res: Response) => {
        try {
            const newestsItems = await Item.findAll({
                attributes: ['id', 'name', 'price', 'promotion', 'description', 'in_stock', 'thumbnail_url'],
                include: [
                    {
                        association: 'ItemPromotion',
                        attributes: ['price']
                    }
                ],
                order: [['createdAt', 'DESC']],
                limit: 10
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
            const item = await Item.findOne({
                where: { id: itemId },
                attributes: ['id', 'name', 'price', 'description', 'in_stock', 'promotion', 'thumbnail_url', 'images', 'sub_category_id'],
                include: [{
                    association: 'ItemPromotion',
                    attributes: ['price']
                },
                {
                    association: 'TagValues',
                    through: { attributes: [] },
                    attributes: ['id', 'name'],
                    include: [{
                        association: 'Tag',
                        attributes: ['id', 'name']
                    }]
                }]
            })

            return res.json(item)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },
    showItemById: async (req: Request, res: Response) => {
        try {
            const ids = req.body
            const items = await Item.findAll({
                where: {
                    id:{
                        [Op.in]: ids
                    }
                },
                attributes: ['id', 'name', 'price', 'description', 'in_stock', 'promotion', 'thumbnail_url', 'sub_category_id'],
                include: [
                    {
                        association: 'ItemPromotion',
                        attributes: ['price']
                    },
                    {
                        association:'ItemCharacteristic',
                        attributes:[['item_id','id'],'width','height','length','weight','insurance_value','quantity']
                    }
                ]
            })

            return res.json(items)
        } catch (error) {
            
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

    updatePromotion: async (itemId: number) => {

        try {
            const item = await Item.findOne({
                where: { id: itemId },
                include: [
                    {
                        association: 'ItemPromotion'
                    }
                ]
            })
            if (item) {
                if (item?.ItemPromotion) {
                    item.promotion = true
                    await item.save()
                    return
                }
                item.promotion = false
                await item.save()
                return
            }


        } catch (error) {
            if (error instanceof Error) {
                return error
            }
        }
    },

    getItemCharacteristics:async(req:Request,res:Response)=>{
        try {
            const itemId = req.params.id

            const itemCharacteristics = await ItemCharacteristics.findByPk(itemId,
                {
                    attributes:[['item_id','id'],'width','height','length','weight','insurance_value','quantity']
                }
            )

            return res.status(200).json(itemCharacteristics)

        } catch (error) {
            if(error instanceof Error ){
                return error
            }
        }
    }
}