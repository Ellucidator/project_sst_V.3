import { ResourceOptions } from "adminjs";


export const companyInformationResourceOptions:ResourceOptions = {
    navigation:'Configurações',
    editProperties:['name','cnpj','email','phone','address','phone_url','address_url','instagram_url'],
    listProperties:['id','name','cnpj','email','phone','phone_url','address','address_url','instagram_url'],
    showProperties:['id','name','cnpj','email','phone','phone_url','address','address_url','instagram_url','createdAt','updatedAt'],
    filterProperties:['id','name','cnpj','email','phone','phone_url','address','address_url','instagram_url','createdAt','updatedAt'],
}