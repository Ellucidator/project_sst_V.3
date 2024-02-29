import { ResourceOptions } from "adminjs";



export const subCategoriesResourceOptions:ResourceOptions = {
    navigation: 'Cátalogo',
    editProperties: ['name', 'category_id'],
    listProperties: ['id', 'name', 'category_id'],
    showProperties: ['id', 'name', 'category_id', 'createdAt', 'updatedAt'],
    filterProperties: ['id', 'name', 'category_id', 'createdAt', 'updatedAt'],
}