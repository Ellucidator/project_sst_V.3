import { DataTypes, Model } from "sequelize"
import { sequelize } from "../index.js"
import { UserInstance } from "./User.js"
import { ItemInstance } from "./Item.js"


export interface Favorite{
    user_id: number
    item_id: number
}

export interface FavoriteInstance extends Model<Favorite>,Favorite{
    User?:UserInstance,
    Item?:ItemInstance
}

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