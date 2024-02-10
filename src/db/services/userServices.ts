import { Favorite } from "../models/index.js"


export const userServices = {
    favorites: async (userId: number) => {
        const favorites = await Favorite.findAll({
            where:{user_id:userId},
            include:[{
                association:'Item',
                attributes: ['id', 'name', 'price', 'in_stock', 'thumbnail_url', 'promotion'],
                include:[{
                    association:'Promotion',
                    attributes: ['price']
                }]
            }]
        })
        return {
            userId,
            favorites: favorites.map(favorite=>{
                if(favorite.Item!.promotion){
                    return favorite.Item
                }else{
                    return {
                        id: favorite.Item!.id,
                        name: favorite.Item!.name,
                        price: favorite.Item!.price,
                        in_stock: favorite.Item!.in_stock,
                        thumbnail_url: favorite.Item!.thumbnail_url
                    }
                }
            })
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