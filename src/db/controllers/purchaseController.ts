import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import { CreateItemSellAttributes } from "../models/ItemSell.js";
import { Item, ItemSell, Purchase } from "../models/index.js";
import { Op } from "sequelize";
import { QueryParams } from "adminjs";
import { getPaginationParams } from "../../helpers/getPaginationParams.js";


export const purchaseController = {

    addPurchase: async (req: AuthenticatedRequest, res: Response) => {
        try {
            let all_value: number=0

            const userId = req.user!.id
            const createPurchase = await Purchase.create({
                user_id: userId,
            })

            const items: { itemId: number, quantity: number}[] = req.body

            const itemsId = items.map(item => item.itemId)
            const itemsDB = await Item.findAll({
                where: { id: { [Op.in]: itemsId } },
                attributes: ['id','price','in_stock', 'promotion'],
                include: [
                    {
                        association: 'ItemPromotion',
                        attributes: ['price']
                    }
                ]
            })
            const createItemSell = itemsDB.map((item)=>{
                let price:number
                if(item.promotion)price=item.ItemPromotion!.price
                else price=item.price

                const quantity = items.find(elem=>elem.itemId===item.id)!.quantity
                all_value+=(price*quantity)
                return {
                    item_id: item.id,
                    purchase_id: createPurchase.id,
                    quantity,
                    price
                }
            })
            const itemsSell = await ItemSell.bulkCreate(createItemSell)
            await createPurchase.update({ all_value: all_value })

            return res.status(201).json({
                id: createPurchase.id,
                all_value,
                itemsSell
            })

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },

    showPurchase: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const [page,perPage] = getPaginationParams(req.query)
            
            const userId = req.user!.id
            const purchases = await Purchase.findAll({
                where: { user_id: userId },
                limit: perPage,
                offset: (page-1)*perPage,
                order: [['created_at', 'DESC']],
                include: [
                    {
                        model: ItemSell,
                        attributes: ['quantity', 'price'],
                        include: [
                            {
                                association: 'Item',
                                attributes: ['thumbnail_url','name'],
                            }
                        ]

                    }
                ]
            })

            return res.json(purchases)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },

}