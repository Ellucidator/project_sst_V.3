import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../index.js";


export interface Purchase{
    id:number,
    user_id:number
    all_value:number
    status:string
}

export interface CreatePurchaseAttributes extends Optional<Purchase,'id'|'all_value'|'status'>{}

export interface PurchaseInstance extends Model<Purchase,CreatePurchaseAttributes>,Purchase{}

export const Purchase = sequelize.define<PurchaseInstance,Purchase>('Purchase',{
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
    all_value:{
        type: DataTypes.FLOAT,
        allowNull: true
    },
    status:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Recebido'
    }
})