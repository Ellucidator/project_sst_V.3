import { DataTypes, Model } from "sequelize";
import { sequelize } from "../index.js";

export interface ItemTagValue{
    item_id:number,
    tag_value_id:number
}

export interface ItemTagValueInstance extends Model<ItemTagValue>, ItemTagValue{}


export const ItemTagValue = sequelize.define<ItemTagValueInstance,ItemTagValue>('ItemTagValue',{
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
    tag_value_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:'tags_value',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    }
},
{
    tableName:'items_tags_value'
})