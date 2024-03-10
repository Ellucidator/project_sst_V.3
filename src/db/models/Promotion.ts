import { Model, Optional,DataTypes } from "sequelize"
import { sequelize } from "../index.js"

export interface Promotion{
    id:number
    name:string
    description:string
    featured:boolean
}

export interface CreatePromotionAttributes extends Optional<Promotion, 'description'|'featured'>{}

export interface PromotionInstance extends Model<Promotion, CreatePromotionAttributes>, Promotion{}

export const Promotion = sequelize.define<PromotionInstance,Promotion>('Promotion',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
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
},
{
    tableName: 'promotions'
})