import { ResourceOptions } from "adminjs";


export const tagsResourceOptions:ResourceOptions = {
    editProperties:['name'],
    showProperties:['id','name','createdAt','updatedAt'],
    filterProperties:['id','name','createdAt','updatedAt'],
    listProperties:['id','name']
}