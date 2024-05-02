import { DataTypes, Model } from "sequelize";
import { sequelize } from "../index.js";

export interface Avaliation {
    id: number;
    item_id: number;
    user_id: number;
    rating: number;
    title: string;
    comment: string;
}

export interface AvaliationInstance extends Model<Avaliation>, Avaliation {}

export const Avaliation = sequelize.define<AvaliationInstance, Avaliation>("Avaliation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    item_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "items",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    rating: {
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING
    },
    comment: {
        type: DataTypes.STRING
    }
},
{
    tableName: "avaliations"
})