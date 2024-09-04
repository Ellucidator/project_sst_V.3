import { Request, Response } from "express";
import { Avaliation } from "../models/index.js";
import { getPaginationParams } from "../../helpers/getPaginationParams.js";


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
            const [userId, itemId] = req.params.id.split('-')
            const avaliation = await Avaliation.findOne(
                { 
                    where: { user_id: userId, item_id: itemId },
                    attributes:['rating','title','comment','createdAt'], 
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
            const [perPage,offset,order] = getPaginationParams(req.query)

            const avaliations = await Avaliation.findAndCountAll({
                where: { item_id: id },
                attributes:['rating','title','comment','createdAt'],
                order: [[order[0], order[1]]],
                limit: perPage,
                offset: offset
            })

            return res.status(200).json(avaliations)
        } catch (error) {
            
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    }
}