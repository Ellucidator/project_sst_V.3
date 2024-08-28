import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../index.js"
import { Item } from "./index.js"
import { Op } from "sequelize"

export interface ItemSell{
    id: number
    item_id: number
    purchase_id: number
    quantity: number
    price: number
}

export interface CreateItemSellAttributes extends Optional<ItemSell, 'id'>{}

export interface ItemSellInstance extends Model<ItemSell, CreateItemSellAttributes>, ItemSell{}


export const ItemSell = sequelize.define<ItemSellInstance,ItemSell>('ItemSell',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    purchase_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'purchases',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    item_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'items',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
},
{
    tableName: 'items_sell',
    // Opção para a verificação de estoque
    // hooks: {
    //     beforeBulkCreate: async(instances, options)=> {
    //         const itemsDb= await Item.findAll({
    //             where:{
    //                 id: {
    //                     [Op.in]: instances.map(instance => instance.item_id)
    //                 }
    //             },
    //             attributes: ['id','price','in_stock', 'promotion'],
    //             include: [
    //                 {
    //                     association: 'ItemPromotion',
    //                     attributes: ['price']
    //                 }
    //             ]
    //         })
    //         instances.forEach(instance => {
    //             const itemDb = itemsDb.find(item => item.id === instance.item_id)

    //             if(!itemDb) throw new Error('Item não encontrado')
    //             if(instance.quantity > itemDb.in_stock) throw new Error('Estoque insuficiente')
    //             itemDb.in_stock = itemDb.in_stock - instance.quantity
                
    //             instance.price = itemDb.price
    //             if(itemDb.promotion)instance.price = itemDb.ItemPromotion!.price

    //             itemDb.save()
    //         })
    //     },
    // }
})

