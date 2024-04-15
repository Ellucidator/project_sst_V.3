import { ResourceOptions } from "adminjs";


export const itemTagValueResourceOptions:ResourceOptions = {
    navigation:'Tags',
    editProperties:['tag_value_id','item_id'],
    showProperties:['tag_value_id','item_id'],
    filterProperties:['tag_value_id','item_id'],
    listProperties:['tag_value_id','item_id']
}