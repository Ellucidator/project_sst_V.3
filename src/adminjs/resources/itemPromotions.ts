import { ResourceOptions } from "adminjs";


export const itemPromotionsResourceOptions:ResourceOptions = {
    navigation: 'Sales',
    editProperties: ['item_id', 'promotion_id', 'price', 'description'],
    listProperties: ['id', 'item_id', 'promotion_id', 'price', 'description'],
    showProperties: ['id', 'item_id', 'promotion_id','price', 'description', 'createdAt', 'updatedAt'],
    filterProperties: ['id', 'item_id', 'promotion_id', 'createdAt', 'updatedAt'],
}