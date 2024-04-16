import { ResourceOptions } from "adminjs";


export const subCategoryTagResourceOptions:ResourceOptions = {
    navigation:'Tags',
    editProperties:['tag_id','sub_category_id'],
    showProperties:['tag_id','sub_category_id'],
    filterProperties:['tag_id','sub_category_id'],
    listProperties:['tag_id','sub_category_id']
}