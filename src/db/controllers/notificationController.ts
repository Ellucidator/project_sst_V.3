import { Request, Response } from "express";





export const notificationController = {

    show: async (req: Request, res: Response) => {

        console.log(req.body)

        return res.status(200)
    }
}