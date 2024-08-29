import { Request, Response } from "express";
import { MercadoPagoPaymentActionResponse, payment } from "../models/MercadoPago.js";
import { Purchase } from "../models/index.js";


export const notificationController = {

    purchaseStatusMp: async (req: Request, res: Response) => {

        try {
            const json_body: MercadoPagoPaymentActionResponse = req.body

            if(json_body.data.id)res.status(200).json({})

            const payamentInfo = await payment.get({id: json_body.data.id})
            if(!payamentInfo.additional_info?.items)return

            const purchase = await Purchase.findOne({
                where: {
                    id: payamentInfo.additional_info.items[0].category_id
                }
            })

            if(purchase)await purchase.update(
                {
                    payment_id:json_body.data.id,
                    payment_type:payamentInfo.payment_type_id,
                    payment_status:payamentInfo.status
                }
            )
            return
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}