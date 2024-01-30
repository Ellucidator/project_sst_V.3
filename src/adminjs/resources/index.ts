import { ResourceWithOptions } from "adminjs";
import { Photo } from "../../db/models/index.js";
import { photoResourceOptions, photoResourceFeatures } from "./photo.js";

export const AdminJSResources:ResourceWithOptions[] = [
    {
        resource: Photo,
        options:photoResourceOptions,
        features:photoResourceFeatures
    }
]