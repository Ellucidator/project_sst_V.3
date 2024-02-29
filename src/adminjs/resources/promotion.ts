import { ResourceOptions } from "adminjs";

export const promotionResourceOptions:ResourceOptions = {
    navigation: 'Cátalogo',
    editProperties: ['item_id', 'price', 'description'],
    listProperties: ['item_id', 'price', 'description'],
    showProperties: ['item_id', 'price', 'description', 'createdAt', 'updatedAt'],
    filterProperties: ['item_id','createdAt', 'updatedAt'],
    properties: {
        price: {
            type: 'currency',
        },
    }
}