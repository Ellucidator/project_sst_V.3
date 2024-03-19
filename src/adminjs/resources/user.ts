import { FeatureType, ResourceOptions } from "adminjs";
import uploadFeature from "@adminjs/upload";
import { componentLoader } from "../components/component-loader.js";

export const userResourceOptions:ResourceOptions = {
    navigation: 'Clientes',
    editProperties: ['perfilFile','first_name', 'last_name','phone', 'birth', 'email', 'password','role'],
    listProperties: ['id','perfilFile', 'first_name', 'last_name','phone', 'email', 'role'],
    showProperties: ['id','role','perfilFile', 'first_name', 'last_name','phone','birth', 'email', 'createdAt', 'updatedAt'],
    filterProperties: ['id', 'first_name', 'last_name', 'email','role','birth', 'createdAt', 'updatedAt'],
    properties: {
        password: {
            type: 'password',
            isVisible: false,
        },
        birth: {
            type: 'date',
        },
        role: {
            availableValues:[
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
            ]
        },
    }
}

export const userResourceFeatures:FeatureType[]=[
    uploadFeature({
        componentLoader,
        provider:{local:{bucket:'public/files',opts:{baseUrl:'/files'}}},
        properties:{
            file: 'perfilFile',
            key:'img_key',
            bucket:'bucket',
            mimeType:'mime',
        },
        uploadPath: (record, filename) => (
            `users/${record.id()}/thumbnail/${filename}`
        ),
    })
]