import { FeatureType, ResourceOptions } from "adminjs";
import uploadFeature from "@adminjs/upload";
import { componentLoader } from "../components/component-loader.js";


const photoProperties = (options = {}) => ({
    bucket: {
        type: 'string',
        isVisible: false,
        ...options,
    },
    mime: {
        type: 'string',
        isVisible: false,
        ...options,
    },
    size: {
        type: 'number',
        isVisible: false,
        ...options,
    },
} as const)

const uploadFeatureFor = (name?: string, multiple = false) => (
    uploadFeature({
        componentLoader,
        provider: {
            local:{
                bucket:'public/files',
                opts:{
                    baseUrl:'/files'
                }
            }
        },
        multiple,
        properties: {
            file: name ? `${name}.file` : 'thumbnail',
            filePath: name ? `${name}.filePath` : 'filePath',
            filesToDelete: name ? `${name}.filesToDelete` : 'filesToDelete',
            key: name ? `${name}.key` : 'thumbnail_url',
            mimeType: name ? `${name}.mime` : 'mime',
            bucket: name ? `${name}.bucket` : 'bucket',
            size: name ? `${name}.size` : 'size',
        },
        uploadPath: (record, filename) => (
            name ? `items/${record.id()}/${name}/${filename}` : `items/${record.id()}/thumbnail/${filename}`
        ),
    })
)

const photoPropertiesFor = (name, options = {}) => {
    const properties = photoProperties(options)
    return Object.keys(properties).reduce((memo, key) => ({
        ...memo, [`${name}.${key}`]: properties[key],
    }), {})
}

export const itemResourceOptions: ResourceOptions = {
    navigation: 'Estoque',
    properties: {
        images:{
            type:'mixed'
        },
        price:{
            type: 'currency',
        },
        description:{
            type: 'textarea',
            isSortable: false
        },
        ...photoProperties(),
        ...photoPropertiesFor('images',{isArray:true})
    },
    editProperties: ['name', 'description', 'price', 'in_stock', 'featured', 'promotion', 'sub_category_id','thumbnail', 'images'],
    listProperties: ['id', 'name', 'price', 'in_stock', 'featured', 'promotion', 'thumbnail','sub_category_id'],
    showProperties: ['id', 'name', 'description', 'price', 'in_stock', 'featured', 'promotion','sub_category_id', 'thumbnail', 'images'],
    filterProperties: ['id', 'name', 'price', 'featured', 'promotion', 'createdAt', 'updatedAt', 'sub_category_id'],
    
};

export const itemResourceFeatures: FeatureType[] = [
    uploadFeatureFor(),
    uploadFeatureFor('images',true)
]