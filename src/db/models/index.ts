import { Category } from './Category.js';
import {SubCategory} from './SubCategory.js';
import { Item } from './Item.js';
import { User } from './User.js';
import { Promotion } from './Promotion.js';
import { Favorite } from './Favorites.js';
import { Purchase } from './Purchases.js';
import { ItemSell } from './ItemSell.js';
import { ItemPromotion } from './ItemPromotion.js';
import { Tag } from './Tag.js';
import { TagValue } from './TagValue.js';
import { ItemTagValue } from './ItemTagValue.js';
import { SubCategoryTag } from './SubCategoryTag.js';
import { Avaliation } from './Avaliation.js';
import { ItemCharacteristics } from './ItemCharacteristics.js';
import { Address } from './Address.js';
import { CompanyInformation } from './CompanyInformation.js';

Category.hasMany(SubCategory,{foreignKey:'category_id',onUpdate:'CASCADE',onDelete:'RESTRICT'});
SubCategory.belongsTo(Category,{foreignKey:'category_id'});

SubCategory.hasMany(Item,{foreignKey:'sub_category_id',onUpdate:'CASCADE',onDelete:'RESTRICT'});
Item.belongsTo(SubCategory,{foreignKey:'sub_category_id'});



Item.belongsToMany(User,{through:Favorite,foreignKey:'item_id',otherKey:'user_id'})
User.belongsToMany(Item,{through:Favorite,foreignKey:'user_id',otherKey:'item_id'})

User.hasMany(Favorite,{foreignKey:'user_id'});
Favorite.belongsTo(User,{foreignKey:'user_id'});

Item.hasMany(Favorite,{foreignKey:'item_id'});
Favorite.belongsTo(Item,{foreignKey:'item_id'});


User.hasMany(Purchase,{foreignKey:'user_id'});
Purchase.belongsTo(User,{foreignKey:'user_id'});

Purchase.hasMany(ItemSell,{foreignKey:'purchase_id'});
ItemSell.belongsTo(Purchase,{foreignKey:'purchase_id'});

Address.hasOne(Purchase,{foreignKey:'address_id'});
Purchase.belongsTo(Address,{foreignKey:'address_id'});

Item.hasMany(ItemSell,{foreignKey:'item_id'});
ItemSell.belongsTo(Item,{foreignKey:'item_id'});

Promotion.belongsToMany(Item,{through:ItemPromotion,foreignKey:'promotion_id',otherKey:'item_id'})
Item.belongsToMany(Promotion,{through:ItemPromotion,foreignKey:'item_id',otherKey:'promotion_id'})

ItemPromotion.hasOne(Item,{foreignKey:'id',sourceKey:'item_id'});
Item.hasOne(ItemPromotion,{foreignKey:'item_id',sourceKey:'id'});

Tag.hasMany(TagValue,{foreignKey:'tag_id'});
TagValue.belongsTo(Tag,{foreignKey:'tag_id'});


TagValue.belongsToMany(Item,{through:ItemTagValue,foreignKey:'tag_value_id',otherKey:'item_id'})
Item.belongsToMany(TagValue,{through:ItemTagValue,foreignKey:'item_id',otherKey:'tag_value_id'});

Tag.belongsToMany(SubCategory,{through:SubCategoryTag,foreignKey:'tag_id',otherKey:'sub_category_id'})
SubCategory.belongsToMany(Tag,{through:SubCategoryTag,foreignKey:'sub_category_id',otherKey:'tag_id'});

Item.hasOne(ItemCharacteristics,{foreignKey:'item_id', sourceKey:'id'})
ItemCharacteristics.belongsTo(Item,{foreignKey:'item_id', targetKey:'id'})

User.hasMany(Address,{foreignKey:'user_id', sourceKey:'id'});
Address.belongsTo(User,{foreignKey:'user_id', targetKey:'id'});







export {
    Category,
    SubCategory,
    Item,
    User,
    Promotion,
    Favorite,
    Purchase,
    ItemSell,
    ItemPromotion,
    Tag,
    TagValue,
    ItemTagValue,
    SubCategoryTag,
    Avaliation,
    ItemCharacteristics,
    Address,
    CompanyInformation
};