import { FeatureType, ResourceOptions } from "adminjs";
import uploadFeature from "@adminjs/upload";
import { componentLoader } from "../components/component-loader.js";

export const promotionResourceOptions:ResourceOptions = {
    navigation: 'Sales',
    editProperties: [ 'name','thumbnailUrl', 'description', 'featured'],
    listProperties: ['id','thumbnailUrl', 'name', 'description', 'featured'],
    showProperties: ['id','thumbnailUrl', 'name', 'description','featured', 'createdAt', 'updatedAt'],
    filterProperties: ['id','featured','createdAt', 'updatedAt'],

};

export const promotionResourceFeatures:FeatureType[] = [
    uploadFeature({
        componentLoader,
        provider: { local: { bucket: 'public/files', opts: { baseUrl: '/files' } } },
        properties: {
            file: 'thumbnailUrl',
            key: 'thumbnail_url',
            bucket: 'bucket',
            mimeType: 'mime',
        },
        uploadPath: (record, filename) => (`promotions/${record.id()}/thumbnail/${filename}`),
    })
];