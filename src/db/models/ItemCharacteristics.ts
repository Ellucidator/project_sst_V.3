import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../index.js";

export interface ItemCharacteristics{
    item_id: number
    width: number
    height: number
    length: number
    weight: number
    insurance_value: number
    quantity:number
}

export interface ItemCharacteristicAttributes extends Optional<ItemCharacteristics,'quantity'>{}

export interface ItemCharacteristicsInstance extends Model<ItemCharacteristics,ItemCharacteristicAttributes>, ItemCharacteristics{}


export const ItemCharacteristics = sequelize.define<ItemCharacteristicsInstance,ItemCharacteristics>('ItemCharacteristics',{
    item_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:'items',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    width: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    length: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    insurance_value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
},
{
    tableName:'item_characteristics'
})