import { ResourceWithOptions } from "adminjs";
import { Photo,Category } from "../../db/models/index.js";
import { photoResourceOptions, photoResourceFeatures } from "./photo.js";
import { categoriesResourceOptions } from "./categorie.js";

export const AdminJSResources: ResourceWithOptions[] = [
    {
        resource: Photo,
        options: photoResourceOptions,
        features: photoResourceFeatures
    },
    {
        resource: Category,
        options: categoriesResourceOptions
    }
]