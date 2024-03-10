import { ResourceOptions } from "adminjs";

export const promotionResourceOptions:ResourceOptions = {
    navigation: 'Cátalogo',
    editProperties: [ 'name', 'description', 'featured'],
    listProperties: ['id', 'name', 'description', 'featured'],
    showProperties: ['id', 'name', 'description','featured', 'createdAt', 'updatedAt'],
    filterProperties: ['id','featured','createdAt', 'updatedAt'],

}