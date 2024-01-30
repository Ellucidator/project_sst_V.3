import { Model, Optional } from "sequelize";
export interface Photo {
    id: number;
    s3Key: string;
    bucket: string;
    mime: string;
    comment: string;
}
export interface CreatePhotoAtributes extends Optional<Photo, 'id' | 'comment' | 'mime' | 's3Key' | 'bucket'> {
}
export interface PhotoInstace extends Model<Photo, CreatePhotoAtributes>, Photo {
}
export declare const Photo: import("sequelize").ModelCtor<PhotoInstace>;
