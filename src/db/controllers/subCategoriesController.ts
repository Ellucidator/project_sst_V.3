import { Request, Response } from "express";
import { Item, SubCategory } from "../models/index.js";


export const subCategoriesControllers = {
    subCategoryAndItems: async (req:Request, res: Response)=>{
        try {
            const subCategoryId = req.params.id

            const subCategory = await SubCategory.findOne({where: {id:subCategoryId}})

            const subCategoryItems = await Item.findAll({
                where: { sub_category_id: subCategoryId },
                attributes:['id', 'name', 'price','promotion', 'description', 'in_stock', 'thumbnail_url'],
                include:[
                    {
                        association:'ItemPromotion',
                        attributes:['price']
                    }
                ],
                order:[['createdAt', 'ASC']],
            })
            if(!subCategory) {
                return res.status(200).json('Esta sub categoria não tem itens')
            }
            const subCaregoryItemsRes = {
                id: subCategory.id,
                name: subCategory.name,
                items: subCategoryItems.map(item=>{
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
            return res.json(subCaregoryItemsRes)

        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}