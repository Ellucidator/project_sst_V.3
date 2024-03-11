import { Model, Optional,DataTypes } from "sequelize"
import { sequelize } from "../index.js"
import { ItemInstance } from "./Item.js"

export interface Promotion{
    id:number
    name:string
    description:string
    featured:boolean
    thumbnail_url:string
    bucket:string
    mime:string
}

export interface CreatePromotionAttributes extends Optional<Promotion, 'id'|'description'|'featured'|'thumbnail_url'|'bucket'|'mime'>{}

export interface PromotionInstance extends Model<Promotion, CreatePromotionAttributes>, Promotion{
    Items?:ItemInstance[]
}

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
    },
    thumbnail_url:{
        type: DataTypes.STRING,
        allowNull: true
    },
    bucket:{
        type: DataTypes.STRING,
        allowNull: true
    },
    mime:{
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    tableName: 'promotions'
})