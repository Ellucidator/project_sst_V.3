import { ResourceOptions } from "adminjs";


export const categoriesResourceOptions:ResourceOptions = {
    editProperties: ['name', 'position'],
    listProperties: ['id', 'name', 'position'],
    showProperties: ['id', 'name', 'position', 'createdAt', 'updatedAt'],
    filterProperties: ['id', 'name', 'position', 'createdAt', 'updatedAt'],
}