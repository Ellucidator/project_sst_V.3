import express from 'express';
import { categoriesController } from './db/controllers/categorieController.js';
import { itemController } from './db/controllers/itemController.js';
import { subCategoriesControllers } from './db/controllers/subCategoriesController.js';
import { authController } from './db/controllers/authController.js';
import { ensureAuth } from './db/middlewares/auth.js';
import { userController } from './db/controllers/userController.js';
import { purchaseController } from './db/controllers/purchaseController.js';
import {promotionController} from './db/controllers/promotionController.js';

const router = express.Router();

router.post('/login', authController.login)
router.post('/register', authController.register)

router.post('/user/favorite',ensureAuth, userController.addFavorite)
router.get('/user/show/favorites',ensureAuth,userController.showFavorites)

router.get('/user',ensureAuth,userController.show)

router.post('/user/purchase',ensureAuth,purchaseController.addPurchase)
router.get('/user/show/purchases',ensureAuth,purchaseController.showPurchase)

router.get('/promotions/featured', promotionController.getFeaturedPromotion )
router.get('/promotions/:id', promotionController.getPromotionAndItems )

router.get('/categories',categoriesController.list)
router.get('/categories/:id',categoriesController.getOneCategoryAndSubCategories)

router.get('/sub-categories/:id', subCategoriesControllers.subCategoryAndItems)



router.get('/items/highlighted', itemController.highlighted)
router.get('/items/newests', itemController.newests)
router.get('/items/search', itemController.search)
router.get('/items/:id', itemController.show)



export default router