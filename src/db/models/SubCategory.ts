import { Model, Optional, DataTypes } from "sequelize"
import { sequelize } from "../index.js"


export interface SubCategory{
    id:number
    name:string
    category_id:number
}


export interface CreateSubCategoryAttributes extends Optional<SubCategory,'id'>{}

export interface SubCategoryInstace extends Model<SubCategory,CreateSubCategoryAttributes>,SubCategory{}

export const SubCategory = sequelize.define<SubCategoryInstace,SubCategory>('SubCategory',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'categories',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'RESTRICT'
    }
},
{
    tableName: 'sub_categories'
})