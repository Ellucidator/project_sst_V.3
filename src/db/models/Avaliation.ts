import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../index.js";

export interface Avaliation {
    id: number;
    item_id: number;
    user_id: number;
    rating: number;
    title: string;
    comment: string;
}

export interface AvaliationCreationAttributes extends Optional<Avaliation, "id"> { }

export interface AvaliationInstance extends Model<Avaliation, AvaliationCreationAttributes>, Avaliation { }

export const Avaliation = sequelize.define<AvaliationInstance, Avaliation>("Avaliation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'items',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        tableName: "avaliations"
    })