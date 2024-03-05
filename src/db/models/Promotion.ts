import { Model, Optional,DataTypes } from "sequelize"
import { sequelize } from "../index.js"

export interface Promotion{
    item_id: number
    price: number
    description: string
    featured: boolean
}

export interface CreatePromotionAttributes extends Optional<Promotion, 'description'|'featured'>{}

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
    },
    featured:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
})