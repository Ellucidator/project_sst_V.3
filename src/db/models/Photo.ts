import { Model, Optional, DataTypes } from "sequelize"
import {sequelize} from "../index.js";

export interface Photo{
    id: number
    s3_key: string
    bucket: string
    mime: string
    comment: string
}

export interface CreatePhotoAtributes extends Optional<Photo, 'id'|'comment'|'mime'|'s3_key'|'bucket'>{}

export interface PhotoInstace extends Model<Photo, CreatePhotoAtributes>, Photo {}


export const Photo = sequelize.define<PhotoInstace,Photo>('Photo', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    s3_key:{
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
    comment:{
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    tableName: 'photos'
})