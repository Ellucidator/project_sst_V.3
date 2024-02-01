import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../index.js";

export interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    in_stock: number;
    featured: boolean;
    promotion: boolean;
    thumbnail_url: string;
    images: string[];
    sub_category_id: number;
}

export interface CreateItemAttributes extends Optional<Item, 'id'|'description'|'featured'|'promotion'> {}


export interface ItemInstance extends Model<Item, CreateItemAttributes>, Item {}

export const Item = sequelize.define<ItemInstance, Item>('Item', {
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
    description:{
        type: DataTypes.STRING,
        allowNull: true
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    in_stock:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    featured:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    promotion:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    thumbnail_url:{
        type: DataTypes.STRING,
        allowNull: true
    },
    images:{
        type: DataTypes.JSONB,
        allowNull: true
    },
    sub_category_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'sub_categories',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'RESTRICT'
    }
},{
    tableName: 'items'
})