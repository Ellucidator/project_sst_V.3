import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../index.js";
import { ItemPromotionInstance } from "./ItemPromotion.js";


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
    created_at:Date;
    updated_at:Date;
}

export interface CreateItemAttributes extends Optional<Item, 'id'|'description'|'featured'|'promotion'|'thumbnail_url'|'bucket'|'mime'|'size'|'images'|'created_at'|'updated_at'> {}


export interface ItemInstance extends Model<Item, CreateItemAttributes>, Item {
    ItemPromotion?: ItemPromotionInstance,
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
        allowNull: true
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
    created_at:{
        type: DataTypes.DATE
    },
    updated_at:{
        type:DataTypes.DATE

    }
},{
    tableName: 'items'
})