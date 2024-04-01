import { ResourceOptions } from "adminjs";


export const itemTagResourceOptions:ResourceOptions = {
    navigation:'Tags',
    editProperties:['item_id','tag_id'],
    showProperties:['item_id','tag_id','createdAt','updatedAt'],
    filterProperties:['item_id','tag_id','createdAt','updatedAt'],
    listProperties:['item_id','tag_id']
}