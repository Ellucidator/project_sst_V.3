import { ResourceOptions } from "adminjs";


export const itemCharacteristicsResourceOptions:ResourceOptions = {
    navigation:'Estoque',
    editProperties:['item_id','width','height','length','weight','insurance_value'],
    showProperties:['item_id','width','height','length','weight','insurance_value'],
    filterProperties:['item_id'],
    listProperties:['item_id','width','height','length','weight','insurance_value']
}