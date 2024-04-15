import { ResourceOptions } from "adminjs";


export const tagValueResourceOptions:ResourceOptions = {
    navigation:'Tags',
    editProperties:['name','tag_id'],
    showProperties:['id','name','createdAt','updatedAt','tag_id'],
    filterProperties:['id','name','createdAt','updatedAt','tag_id'],
    listProperties:['id','name','createdAt','updatedAt','tag_id']
}