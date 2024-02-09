import { Category } from './Category.js';
import {SubCategory} from './SubCategory.js';
import { Item } from './Item.js';
import { User } from './User.js';
import { Promotion } from './Promotion.js';
import { Favorite } from './Favorites.js';
import { Purchase } from './Purchases.js';
import { ItemSell } from './ItemSell.js';

Category.hasMany(SubCategory,{foreignKey:'category_id',onUpdate:'CASCADE',onDelete:'RESTRICT'});
SubCategory.belongsTo(Category,{foreignKey:'category_id'});

SubCategory.hasMany(Item,{foreignKey:'sub_category_id',onUpdate:'CASCADE',onDelete:'RESTRICT'});
Item.belongsTo(SubCategory,{foreignKey:'sub_category_id'});

Item.hasOne(Promotion,{foreignKey:'item_id'});
Promotion.belongsTo(Item,{foreignKey:'item_id'});

Item.belongsToMany(User,{through:Favorite})
User.belongsToMany(Item,{through:Favorite})

User.hasMany(Favorite);
Favorite.belongsTo(User);

Item.hasMany(Favorite);
Favorite.belongsTo(Item);

User.hasMany(Purchase);
Purchase.belongsTo(User);

Item.belongsToMany(Purchase,{through:ItemSell})
Purchase.belongsToMany(Item,{through:ItemSell})

Item.hasMany(ItemSell);
ItemSell.belongsTo(Item);




export {
    Category,
    SubCategory,
    Item,
    User,
    Promotion,
    Favorite
};