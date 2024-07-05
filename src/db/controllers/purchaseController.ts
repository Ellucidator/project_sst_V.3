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

            const address_id = parseInt(req.params.id)
            const {items,total}:{items:{ id: number, quantity: number, price: number}[], total: number} = req.body
            const userId = req.user!.id
            const teste = req.body

            console.log(teste)
            console.log(items,userId,address_id)

            const createPurchase = await Purchase.create({
                user_id: userId,
                address_id
            })


            const itemsId = items.map(item => item.id)

            console.log(itemsId)

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

                const quantity = items.find(elem=>elem.id===item.id)!.quantity
                if(item.in_stock<quantity)process.exit(1)

                item.update({in_stock:item.in_stock-quantity})
                
                let price:number
                if(item.promotion)price=item.ItemPromotion!.price
                else price=item.price
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

            const [count,rows] = await Promise.all([
                Purchase.count({ where: { user_id: userId } }),
                Purchase.findAll({
                    where: { user_id: userId },
                    limit: perPage,
                    offset: (page-1)*perPage,
                    order: [['created_at', 'DESC']],
                    include: [
                        {
                            association: 'ItemSells',
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
            ])

            return res.json({count,rows})
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },
    showPurchaseById: async (req: AuthenticatedRequest, res: Response) => {
        try {            
                const userId = req.user!.id
                const purchaseId = req.params.id

                const purchase = await Purchase.findOne({
                    where: { id: purchaseId, user_id: userId },
                    include: [
                        {
                            association: 'ItemSells',
                            attributes: ['quantity', 'price'],
                            include: [
                                {
                                    association: 'Item',
                                    attributes: ['thumbnail_url','name'],
                                }
                            ]
        
                        },
                        {
                            association: 'Address',
                        }
                    ]
                })
            

            return res.json(purchase)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },

}