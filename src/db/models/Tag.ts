import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../index.js"

export interface Tag {
    id: number
    name: string
}


export interface CreateTagAttributes extends Optional<Tag, 'id'> { }

export interface TagInstance extends Model<Tag, CreateTagAttributes>, Tag { }

export const Tag = sequelize.define<TagInstance, Tag>('Tag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
},
{
    tableName:'tags'
})