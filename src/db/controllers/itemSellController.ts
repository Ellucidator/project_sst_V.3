import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import { CreateItemSellAttributes, ItemSell } from "../models/ItemSell.js";
import { Purchase } from "../models/Purchases.js";

export const purchaseController = {

    add:async (req:AuthenticatedRequest, res:Response) => {
        try {
            const userId = req.user!.id
            const createPurchase = await Purchase.create({
                user_id: userId,
            })

            const items:{itemId:number,quantity:number}[] = req.body

            const itensCreate:CreateItemSellAttributes[] = items.map(item => {
                return {
                    purchase_id: createPurchase.id,
                    item_id: item.itemId,
                    quantity: item.quantity
                }
            })

            ItemSell.bulkCreate(itensCreate)

            return res.status(201).json({message: 'Purchase created', id: createPurchase.id})

        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }

}