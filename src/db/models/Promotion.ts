import { Model, Optional,DataTypes } from "sequelize"
import { sequelize } from "../index.js"

export interface Promotion{
    item_id: number
    price: number
    description: string
}

export interface CreatePromotionAttributes extends Optional<Promotion, 'description'>{}

export interface PromotionInstance extends Model<Promotion, CreatePromotionAttributes>, Promotion{}

export const Promotion = sequelize.define<PromotionInstance,Promotion>('Promotion',{
    item_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
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
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    }
})