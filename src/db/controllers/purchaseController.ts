import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import { CreateItemSellAttributes } from "../models/ItemSell.js";
import {Item, ItemSell, Purchase } from "../models/index.js";


export const purchaseController = {

    addPurchase:async (req:AuthenticatedRequest, res:Response) => {
        try {
            const userId = req.user!.id
            const createPurchase = await Purchase.create({
                user_id: userId,
            })

            const items:{itemId:number,quantity:number, price:number}[] = req.body

            const itensCreate:CreateItemSellAttributes[] = items.map(item => {
                return {
                    purchase_id: createPurchase.id,
                    item_id: item.itemId,
                    quantity: item.quantity,
                    price: item.price
                }
            })
            const createItens = await ItemSell.bulkCreate(itensCreate)

            return res.status(201).json(createItens)

        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },

    showPurchase: async (req:AuthenticatedRequest, res:Response)=>{
        try {

            const userId = req.user!.id
            const purchases =await Purchase.findAll({
                where:{user_id: userId},
                include:[
                    {
                        model:ItemSell,
                        include:[
                            {
                                association:'Item'
                            }
                        ]
                        
                    }
                ]
            })

            return res.json(purchases)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }

}