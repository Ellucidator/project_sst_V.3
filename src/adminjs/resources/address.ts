import { ResourceOptions } from "adminjs";


export const adressesResourceOptions:ResourceOptions = {
    navigation: 'Clientes',
    editProperties: ['user_id','zip_code','state','city','neighborhood','street','house_number','complement','reference_point','active'],
    listProperties: ['user_id','zip_code','state','city','neighborhood','street','house_number','complement','reference_point','active'],
    showProperties: ['user_id','zip_code','state','city','neighborhood','street','house_number','complement','reference_point','active'],
    filterProperties: ['user_id','zip_code','state','city','active'],
}