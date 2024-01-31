import {Photo} from './Photo.js';
import { Category } from './Category.js';
import {SubCategory} from './SubCategory.js';


Category.hasMany(SubCategory,{foreignKey:'category_id',onUpdate:'CASCADE',onDelete:'RESTRICT'});
SubCategory.belongsTo(Category,{foreignKey:'category_id'});

export {
    Photo,
    Category,
    SubCategory
};