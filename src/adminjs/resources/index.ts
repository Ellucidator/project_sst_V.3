import { ResourceWithOptions } from "adminjs";
import { Photo,Category, SubCategory } from "../../db/models/index.js";
import { photoResourceOptions, photoResourceFeatures } from "./photo.js";
import { categoriesResourceOptions } from "./category.js";
import { subCategoriesResourceOptions } from "./sub_category.js";

export const AdminJSResources: ResourceWithOptions[] = [
    {
        resource: Photo,
        options: photoResourceOptions,
        features: photoResourceFeatures
    },
    {
        resource: Category,
        options: categoriesResourceOptions
    },
    {
        resource: SubCategory,
        options: subCategoriesResourceOptions
    }
]