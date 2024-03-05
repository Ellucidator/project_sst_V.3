import { ResourceOptions } from "adminjs";

export const promotionResourceOptions:ResourceOptions = {
    navigation: 'Cátalogo',
    editProperties: ['item_id', 'price', 'description', 'featured'],
    listProperties: ['item_id', 'price', 'description', 'faetured'],
    showProperties: ['item_id', 'price', 'description','faetured', 'createdAt', 'updatedAt'],
    filterProperties: ['item_id','faetured','createdAt', 'updatedAt'],
    properties: {
        price: {
            type: 'currency',
        },
    }
}