import { ResourceWithOptions } from "adminjs";
import { Category, SubCategory, Item, User } from "../../db/models/index.js";
import { categoriesResourceOptions } from "./category.js";
import { subCategoriesResourceOptions } from "./sub_category.js";
import { itemResourceFeatures, itemResourceOptions } from "./item.js";
import { userResourceFeatures, userResourceOptions } from "./user.js";

export const AdminJSResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoriesResourceOptions
    },
    {
        resource: SubCategory,
        options: subCategoriesResourceOptions
    },
    {
        resource:Item,
        options:itemResourceOptions,
        features:itemResourceFeatures
    },
    {
        resource:User,
        options:userResourceOptions,
        features:userResourceFeatures
    }

]