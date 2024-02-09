import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../index.js"

export interface ItemSell{
    id: number
    item_id: number
    user_id: number
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
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'users',
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
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
})