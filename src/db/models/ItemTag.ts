import { DataTypes, Model } from "sequelize"
import { sequelize } from "../index.js"

export interface ItemTag {
    item_id: number
    tag_id: number
}

export interface ItemTagInstance extends Model<ItemTag>, ItemTag { }

export const ItemTag = sequelize.define<ItemTagInstance, ItemTag>('ItemTag', {
    item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'items',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'tags',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'

    }
},{
    tableName:'item_tag'
})