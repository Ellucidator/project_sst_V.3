import { Item } from "../models/index.js";
import { Op } from "sequelize";

export const itemServices = {
    findByName:async (name:string)=>{
            const items = await Item.findAll(
                {
                    where:{
                        name:{
                            [Op.iLike]: `%${name}%`
                        }
                    },
                    attributes:['id', 'name', 'price','promotion', 'description', 'in_stock', 'thumbnail_url'],
                    include:[
                        {
                            association:'ItemPromotion',
                            attributes:['price']
                        }
                    ],
                    order:[['createdAt', 'DESC']],
                    limit:10
                }
            )
            return items.map(item=>{
                if(item.ItemPromotion){
                    return {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        in_stock: item.in_stock,
                        thumbnail_url: item.thumbnail_url,
                        description: item.description,
                        promotion: item.promotion,
                        price_promotion: item.ItemPromotion.price
                    }
                }else{
                    return {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        in_stock: item.in_stock,
                        thumbnail_url: item.thumbnail_url,
                        description: item.description,
                        promotion: item.promotion
                    }
                }
            })
    }
}