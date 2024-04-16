import { DataTypes, Model } from "sequelize";
import { sequelize } from "../index.js";

export interface SubCategoryTag{
    sub_category_id:number,
    tag_id:number
}

export interface SubCategoryTagInstance extends Model<SubCategoryTag>, SubCategoryTag{}


export const SubCategoryTag = sequelize.define<SubCategoryTagInstance,SubCategoryTag>('SubCategoryTag',{
    sub_category_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:'sub_categories',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    tag_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:'tags',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    }
},
{
    tableName:'sub_categories_tags'
})