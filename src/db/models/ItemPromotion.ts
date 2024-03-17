import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../index.js"
import { ItemInstance } from "./Item.js"
import { itemController } from "../controllers/itemController.js"

export interface ItemPromotion{
    id:number
    item_id:number
    promotion_id:number
    price:number
    description:string
};

export interface CreateItemPromotion extends Optional<ItemPromotion, 'id'|'description'>{}

export interface ItemPromotionInstance extends Model<ItemPromotion, CreateItemPromotion>, ItemPromotion{
    Item?:ItemInstance
}

export const ItemPromotion = sequelize.define<ItemPromotionInstance, ItemPromotion>('ItemPromotion',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    item_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'items',
            key:'id'
        },
        unique:true,
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    promotion_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'promotions',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    }
},
{
    tableName: 'items_promotion',
    hooks:{
        afterSave:async (itemPromotion)=>{
            await itemController.updatePromotion(itemPromotion.item_id)
        },
        afterDestroy:async (itemPromotion)=>{
            await itemController.updatePromotion(itemPromotion.item_id)
        }
    }
}
)