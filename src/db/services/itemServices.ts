import { Item } from "../models/indexAdminJs.js";
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
                    limit:15
                }
            )
            return items
    }
}