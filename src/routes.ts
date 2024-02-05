import express from 'express';
import { categoriesController } from './db/controllers/categorieController.js';
import { itemController } from './db/controllers/itemController.js';

const router = express.Router();

router.get('/categories',categoriesController.list)
router.get('/categories/:id',categoriesController.getOneCategoryAndSubCategories)

router.get('/items/highlighted', itemController.highlighted)
router.get('/items/promotion', itemController.promotion)
router.get('/items/:id', itemController.show)


export default router