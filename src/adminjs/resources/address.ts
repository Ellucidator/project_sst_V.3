import { ResourceOptions } from "adminjs";


export const adressesResourceOptions:ResourceOptions = {
    navigation: 'Clientes',
    editProperties: ['user_id','receiver_name','phone_number','zip_code','state','city','neighborhood','street','house_number','complement','reference_point','active'],
    listProperties: ['id','user_id','receiver_name','zip_code','state','city','neighborhood','street','house_number','complement','reference_point','active'],
    showProperties: ['id','user_id','phone_number','receiver_name','zip_code','state','city','neighborhood','street','house_number','complement','reference_point','active'],
    filterProperties: ['id','user_id','zip_code','state','city','active'],
}