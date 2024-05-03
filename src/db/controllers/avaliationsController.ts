import { Request, Response } from "express";
import { Avaliation } from "../models/index.js";


export const avaliationsController = {
    postAvaliation: async (req: Request, res: Response) => {
        try {
            const { item_id, user_id, rating, title, comment } = req.body

            const newAvaliation = await Avaliation.findOrCreate({
                where: { item_id, user_id },
                defaults: { item_id, user_id, rating, title, comment }
            })

            if (newAvaliation[1] === false) {
                await newAvaliation[0].setAttributes({ rating, title, comment }).save()
            }

            return res.status(201).json(newAvaliation)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }

    },

    getAvaliationByUserId: async (req: Request, res: Response) => {
        try {
            const userId = req.params.id
            const avaliation = await Avaliation.findOne(
                { 
                    where: { user_id: userId },
                    attributes:['rating','title','comment','created_at'], 
                }
            )

            return res.status(200).json(avaliation)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },

    getAllAvaliationsByItemId: async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const avaliations = await Avaliation.findAll({
                where: { item_id: id },
                attributes:['rating','title','comment','created_at'],
                order: [['created_at', 'DESC']],
                limit: 10
            })

            return res.status(200).json(avaliations)
        } catch (error) {
            
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    }
}