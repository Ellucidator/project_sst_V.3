import { Request, Response } from "express";
import { Item } from "../models/index.js";
import { itemServices } from "../services/itemServices.js";


export const itemController = {

    highlighted: async (req: Request, res: Response) => {

        try {
            const itemsHighlighted = await Item.findAll({ where: { featured: true }, attributes: ['id', 'name', 'price', 'description', 'in_stock', 'thumbnail_url', 'images'] })
            return res.json(itemsHighlighted)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
        }
    },

    promotion: async (req: Request, res: Response) => {
        try {
            const itemsPromotin = await Item.findAll({ where: { promotion: true }, attributes: ['id', 'name', 'price', 'description', 'in_stock', 'thumbnail_url', 'images'],include:{association:'Promotion'}})
            return res.json(itemsPromotin)
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
    }
}