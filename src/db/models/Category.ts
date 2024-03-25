import { Model, Optional, DataTypes } from "sequelize"
import { sequelize } from "../index.js"
import { SubCategoryInstace } from "./SubCategory.js"


export interface Category{
    id:number
    name:string
    position:number
}

export interface CreateCategoryAtributes extends Optional<Category,'id'|'position'>{}

export interface CategoryInstace extends Model<Category,CreateCategoryAtributes>,Category {
    SubCategories?:SubCategoryInstace[]
}

export const Category = sequelize.define<CategoryInstace,Category>('Category', {
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
    position:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
}
,{
    tableName: 'categories'
})