import { Item, Purchase } from "../models/index.js";
import { sequelize } from "../index.js";
import { Op } from "sequelize";

export async function nodeScheduleServices() {
    try {
        const purchases = await Purchase.findAll({
            
            where: {
                createdAt: {
                    [Op.lt]: new Date().setDate(new Date().getDate() - 6)
                },
                [Op.and]: [
                    sequelize.literal('(payment_status IS NULL OR payment_status = \'rejected\' OR payment_status = \'cancelled\')')
                ]
            },
            include: [
                {
                    association: 'ItemSells'
                }
            ]
        })

        let itemsId:number[] = []
        let itemsQuantity:{id:number,quantity:number}[] = []

        purchases.forEach(purchase => {
            if(purchase.ItemSells) {
                purchase.ItemSells.forEach(item => {
                    const indexItem = itemsId.indexOf(item.item_id)

                    if(indexItem === -1) {
                        itemsId.push(item.item_id)
                        itemsQuantity.push({id:item.item_id,quantity:item.quantity})
                    }
                    if(indexItem !== -1) {
                        itemsQuantity[indexItem].quantity += item.quantity
                    }
                })
            }
        })

        const itemsDB = await Item.findAll({
            where: { id: { [Op.in]: itemsId} },
        })

        itemsDB.forEach(item => {
            const indexItem = itemsId.indexOf(item.id)

            item.in_stock += itemsQuantity[indexItem].quantity

            item.save()
        })

        await Purchase.destroy({
            where: { id: { [Op.in]: purchases.map(purchase => purchase.id)} } 
        })
    } catch (error) {
        
    }
}