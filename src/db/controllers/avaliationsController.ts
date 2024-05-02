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

    }
}