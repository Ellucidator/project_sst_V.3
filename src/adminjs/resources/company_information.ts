import { ResourceOptions } from "adminjs";


export const companyInformationResourceOptions:ResourceOptions = {
    navigation:'Configurações',
    editProperties:['name','cnpj','email','phone','address','address_url','instagram_url'],
    listProperties:['id','name','cnpj','email','phone','address','address_url','instagram_url'],
    showProperties:['id','name','cnpj','email','phone','address','address_url','instagram_url','createdAt','updatedAt'],
    filterProperties:['id','name','cnpj','email','phone','address','address_url','instagram_url','createdAt','updatedAt'],
}