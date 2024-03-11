import { Category } from './Category.js';
import {SubCategory} from './SubCategory.js';
import { Item } from './Item.js';
import { User } from './User.js';
import { Promotion } from './Promotion.js';
import { Favorite } from './Favorites.js';
import { Purchase } from './Purchases.js';
import { ItemSell } from './ItemSell.js';
import { ItemPromotion } from './ItemPromotion.js';

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

Item.hasMany(ItemSell,{foreignKey:'item_id'});
ItemSell.belongsTo(Item,{foreignKey:'item_id'});

Promotion.belongsToMany(Item,{through:ItemPromotion,foreignKey:'promotion_id',otherKey:'item_id'})
Item.belongsToMany(Promotion,{through:ItemPromotion,foreignKey:'item_id',otherKey:'promotion_id'})

ItemPromotion.hasOne(Item,{foreignKey:'id',sourceKey:'item_id'});









export {
    Category,
    SubCategory,
    Item,
    User,
    Promotion,
    Favorite,
    Purchase,
    ItemSell,
    ItemPromotion
};