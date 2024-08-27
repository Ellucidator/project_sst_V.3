import { Request, Response } from "express";
import { TestTableNotification } from "../models/index.js";





export const notificationController = {

    show: async (req: Request, res: Response) => {

        const notifications = await TestTableNotification.findAll()

        return res.status(200).json(notifications)

    },
    purchaseStatusMp: async (req: Request, res: Response) => {

        const json_body=req.body

        const data = await TestTableNotification.create({json_body})

        return res.status(200).json({})
    }
}