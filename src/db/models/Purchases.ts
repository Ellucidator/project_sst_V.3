import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../index.js";
import { ItemCharacteristics } from "./ItemCharacteristics.js";

export interface ItemToCar{
    id:number
    price:number
    ItemCharacteristics: ItemCharacteristics
}
export interface Cart{
    items:ItemToCar[]
    frete:{
        address_id:string|number
        name:string
        price:number
    }
    total:number
}

export interface Purchase{
    id:number
    user_id:number
    address_id:number
    payment_type:string
    all_value:number
    status:string
    frete:string
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
    address_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'adresses',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    payment_type:{
        type: DataTypes.CHAR,
        allowNull: false
    },
    all_value:{
        type: DataTypes.FLOAT,
        allowNull: true
    },
    status:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Recebido'
    },
    frete:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'purchases'
})