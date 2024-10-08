import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../index.js";
import { ItemPromotionInstance } from "./ItemPromotion.js";
import { TagValue } from "./TagValue.js";


export interface ItemPhotoInDB {
    bucket: string;
    mime:string;
    key: string;
    size: number;
}

export interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    in_stock: number;
    featured: boolean;
    promotion: boolean;
    thumbnail_url: string;
    bucket: string;
    mime: string;
    size: number;
    images: string;
    sub_category_id: number;
    createdAt:Date;
    updatedAt:Date;
}

export interface CreateItemAttributes extends Optional<Item, 'id'|'description'|'featured'|'promotion'|'thumbnail_url'|'bucket'|'mime'|'size'|'images'|'createdAt'|'updatedAt'> {}


export interface ItemInstance extends Model<Item, CreateItemAttributes>, Item {
    ItemPromotion?: ItemPromotionInstance,
    TagValues?: TagValue[],
}

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
        allowNull: true,
        defaultValue:false
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
    },
    size:{
        type: DataTypes.INTEGER,
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
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type:DataTypes.DATE

    }
},{
    tableName: 'items'
})