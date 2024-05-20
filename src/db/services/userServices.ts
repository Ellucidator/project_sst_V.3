import { Favorite } from "../models/index.js"


export const userServices = {


    addFavorite: async (userId: number, itemId: number) => {
        const favorite = await Favorite.create({ user_id: userId, item_id: itemId })
        
        return favorite
    },

    deleteFavorite: async (userId: number, itemId: number) => {
        const favorite = await Favorite.destroy({ where: { user_id: userId, item_id: itemId } })
        return favorite
    }
}