import { Favorite } from "../models/index.js"


export const userServices = {
    favorites: async (userId: number) => {
        const favorites = await Favorite.findAll({ where: { user_id: userId }, include: { association: 'Item' } })
        return {
            userId,
            favorites: favorites.map(favorite => favorite.Item)
        }
    },

    addFavorite: async (userId: number, itemId: number) => {
        const favorite = await Favorite.create({ user_id: userId, item_id: itemId })
        return favorite
    },

    deleteFavorite: async (userId: number, itemId: number) => {
        const favorite = await Favorite.destroy({ where: { user_id: userId, item_id: itemId } })
        return favorite
    }
}