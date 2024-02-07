import { Category } from './Category.js';
import {SubCategory} from './SubCategory.js';
import { Item } from './Item.js';
import { User } from './User.js';
import { Promotion } from './Promotion.js';
import { Favorite } from './Favorites.js';

Category.hasMany(SubCategory,{foreignKey:'category_id',onUpdate:'CASCADE',onDelete:'RESTRICT'});
SubCategory.belongsTo(Category,{foreignKey:'category_id'});

SubCategory.hasMany(Item,{foreignKey:'sub_category_id',onUpdate:'CASCADE',onDelete:'RESTRICT'});
Item.belongsTo(SubCategory,{foreignKey:'sub_category_id'});

Item.hasOne(Promotion,{foreignKey:'item_id',onUpdate:'CASCADE',onDelete:'CASCADE'});
Promotion.belongsTo(Item,{foreignKey:'item_id'});

Item.belongsToMany(User,{through:Favorite})
User.belongsToMany(Item,{through:Favorite})

export {
    Category,
    SubCategory,
    Item,
    User,
    Promotion
};