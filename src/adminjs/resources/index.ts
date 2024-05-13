import { ResourceWithOptions } from "adminjs";
import { Category, SubCategory, Item, User, Promotion, ItemPromotion, Tag, ItemTagValue, TagValue, SubCategoryTag, ItemCharacteristics, Address } from "../../db/models/index.js"

import { categoriesResourceOptions } from "./category.js";
import { subCategoriesResourceOptions } from "./sub_category.js";
import { itemResourceFeatures, itemResourceOptions } from "./item.js";
import { userResourceFeatures, userResourceOptions } from "./user.js";
import { promotionResourceFeatures, promotionResourceOptions } from "./promotion.js";
import { itemPromotionsResourceOptions } from "./itemPromotions.js";
import { tagsResourceOptions } from "./tags.js";
import { itemTagValueResourceOptions } from "./item_tag_value.js";
import { tagValueResourceOptions } from "./tag_value.js";
import { subCategoryTagResourceOptions } from "./sub_category_tag.js";
import { itemCharacteristicsResourceOptions } from "./item_characteristics.js";
import { adressesResourceOptions } from "./address.js";


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
        resource: Item,
        options: itemResourceOptions,
        features: itemResourceFeatures
    },
    {
        resource: User,
        options: userResourceOptions,
        features: userResourceFeatures
    },
    {
        resource: Promotion,
        options: promotionResourceOptions,
        features: promotionResourceFeatures
    },
    {
        resource: ItemPromotion,
        options: itemPromotionsResourceOptions
    },
    {
        resource: Tag,
        options: tagsResourceOptions
    },
    {
        resource: SubCategoryTag,
        options: subCategoryTagResourceOptions
    },
    {
        resource: TagValue,
        options: tagValueResourceOptions
    },
    {
        resource: ItemTagValue,
        options: itemTagValueResourceOptions
    },
    {
        resource: ItemCharacteristics,
        options: itemCharacteristicsResourceOptions
    },
    {
        resource: Address,
        options: adressesResourceOptions
    }

]