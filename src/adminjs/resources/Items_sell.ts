import { ResourceOptions } from "adminjs";


export const itemsSellResourceOptions:ResourceOptions = {
    navigation:'Clientes',
    editProperties:[],
    showProperties:['item_id','purchase_id','quantity','price','createdAt','updatedAt'],
    filterProperties:['item_id','purchase_id','quantity','price','createdAt','updatedAt'],
    listProperties:['item_id','purchase_id','quantity','price','createdAt','updatedAt']
}