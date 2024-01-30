import { FeatureType, ResourceOptions } from "adminjs";
import uploadFeature from '@adminjs/upload';
import { componentLoader } from "../components/component-loader.js";



export const photoResourceOptions: ResourceOptions = {
    properties: {
        s3_key: {
            type: 'string'
        },
        bucket: {
            type: 'string'
        },
        mime: {
            type: 'string'
        },
        comment: {
            type: 'textarea',
            isSortable: false
        },
        file: {
            type:'mixed',
        }
    },
    editProperties: ['id', 'bucket', 'comment','file'],
    listProperties: ['id', 'bucket', 'comment','file'],
    showProperties: ['id', 'bucket', 'comment','file'],
}


export const photoResourceFeatures: FeatureType[] = [
    uploadFeature({
        componentLoader,
        provider: { local: {bucket:'public/files',opts:{baseUrl:'/files'}} },
        validation: { mimeTypes: ['image/png'] },
        properties: { file: 'file', key: 's3_key',bucket:'bucket',mimeType:'mime' },
        uploadPath:(record,filename)=>`/thumbnails/course-${record.get('id')}/${filename}`

    }),
]