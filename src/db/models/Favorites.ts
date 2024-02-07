import { DataTypes, Model } from "sequelize"
import { sequelize } from "../index.js"


export interface Favorite{
    user_id: number
    item_id: number
}

export interface FavoriteInstance extends Model<Favorite>,Favorite{}

export const Favorite = sequelize.define<FavoriteInstance,Favorite>('Favorite',{
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false
    },
    item_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false
    }
})