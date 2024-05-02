import { Request, Response } from "express";
import { Avaliation } from "../models/index.js";


export const avaliationsController = {
    postAvaliation: async (req: Request, res: Response) => {
        try {
            const { item_id, user_id, rating, title, comment } = req.body

            const newAvaliation = await Avaliation.create({
                item_id,
                user_id,
                rating,
                title,
                comment
            })

            return res.status(201).json(newAvaliation)
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