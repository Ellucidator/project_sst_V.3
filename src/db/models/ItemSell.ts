import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../index.js"

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
        onDelete:'RESTRICT'
    },
    item_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'items',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'RESTRICT'
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price:{
        type: DataTypes.NUMBER,
        allowNull: false
    }
},
{
    tableName: 'items_sell'
})