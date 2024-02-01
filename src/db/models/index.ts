import {Photo} from './Photo.js';
import { Category } from './Category.js';
import {SubCategory} from './SubCategory.js';
import { Item } from './Item.js';

Category.hasMany(SubCategory,{foreignKey:'category_id',onUpdate:'CASCADE',onDelete:'RESTRICT'});
SubCategory.belongsTo(Category,{foreignKey:'category_id'});


SubCategory.hasMany(Item,{foreignKey:'sub_category_id',onUpdate:'CASCADE',onDelete:'RESTRICT'});
Item.belongsTo(SubCategory,{foreignKey:'sub_category_id'});

export {
    Photo,
    Category,
    SubCategory,
    Item,
};