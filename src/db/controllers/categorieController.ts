import { Request, Response } from "express";
import { Category } from "../models/index.js";
import { ItemInstance } from "../models/Item.js";


export const categoriesController = {

    list: async (req:Request,res:Response) => {
        try {
            const categories = await Category.findAll({
                order: [['position', 'ASC']],
                attributes: ['id', 'name'],
                include:{
                    association:'SubCategories',
                    attributes: ['id', 'name'],
                    order:[['id','DESC']],
                    separate:true
                    
                }});
            return res.json(categories)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },

    getOneCategoryAndSubCategories: async (req:Request,res:Response) => {
        try {
            const {order} = req.query
            let orderQ:string[]=[]

            if(typeof order === 'string') orderQ = order.split('-')
            else orderQ = ['created_at','DESC']


            const categoryId = req.params.id
            const category = await Category.findOne({
                where: {id: categoryId},
                attributes:['id','name'],
                include:[
                    {
                        association:'SubCategories',
                        attributes:['id','name'],
                        include:[
                            {
                                association:'Items',
                                attributes:['id', 'name', 'price','promotion', 'description', 'in_stock', 'thumbnail_url','created_at', 'updated_at',],
                                
                                include:[{
                                    association:'ItemPromotion',
                                    attributes: ['price']
                                }]
                            }
                        ]
                    }
                ]
            })
            if(!category) return

            const Items:ItemInstance[]= []
            category.SubCategories?.forEach((subCategory)=>{
                subCategory.Items?.forEach((item)=>{Items.push(item)})
                
            })

            if(orderQ[0] === 'created_at' ){

                Items.sort((a,b)=> {
                    if(orderQ[1] === 'DESC') return b.getDataValue('created_at').getTime() - a.getDataValue('created_at').getTime();

                    else return a.getDataValue('created_at').getTime() - b.getDataValue('created_at').getTime();
                })

            } else{

                    Items.sort((a,b)=> {

                        let compA:number
                        let compB:number

                        if(a.promotion) compA = a.ItemPromotion!.price
                        else compA = a.price

                        if(b.promotion) compB = b.ItemPromotion!.price
                        else compB = b.price

                        if(orderQ[1] === 'DESC') return compA - compB
                        else return compB - compA
                    })

            }
            
            const categoryRes = {
                id:category.id,
                name:category.name,
                Items
            }

            return res.json(categoryRes)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}