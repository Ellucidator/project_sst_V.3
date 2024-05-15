import express from 'express';
import { categoriesController } from './db/controllers/categorieController.js';
import { itemController } from './db/controllers/itemController.js';
import { subCategoriesControllers } from './db/controllers/subCategoriesController.js';
import { authController } from './db/controllers/authController.js';
import { ensureAuth } from './db/middlewares/auth.js';
import { userController } from './db/controllers/userController.js';
import { purchaseController } from './db/controllers/purchaseController.js';
import {promotionController} from './db/controllers/promotionController.js';
import { tagController } from './db/controllers/tagController.js';
import { avaliationsController } from './db/controllers/avaliationsController.js';
import { addressController } from './db/controllers/addressController.js';

const router = express.Router();

router.post('/login', authController.login)
router.post('/register', authController.register)

router.post('/user/favorite',ensureAuth, userController.addFavorite)
router.get('/user/show/favorites',ensureAuth,userController.showFavorites)
router.post('/user/address',ensureAuth,addressController.create)
router.get('/user/addresses',ensureAuth,addressController.listByUserId)

router.post('/create-user', userController.createUser)
router.get('/user',ensureAuth,userController.show)

router.post('/user/purchase',ensureAuth,purchaseController.addPurchase)
router.get('/user/show/purchases',ensureAuth,purchaseController.showPurchase)

router.get('/promotions/featured', promotionController.getFeaturedPromotion )
router.get('/promotions/:id', promotionController.getPromotionAndItems )

router.get('/categories',categoriesController.list)
router.get('/categories/:id',categoriesController.getOneCategoryAndSubCategories)

router.get('/sub-categories/:id', subCategoriesControllers.subCategoryAndItems)

router.post('/tag-values/:id', tagController.getItemsByTagValue)

router.get('/tags/:id',tagController.getTagsWhereSubCategory)

router.get('/user/:id/avaliation', avaliationsController.getAvaliationByUserId)
router.post('/item/create-avaliation', avaliationsController.postAvaliation)
router.get('/item/:id/avaliations', avaliationsController.getAllAvaliationsByItemId)

router.get('/item/:id/characteristics', itemController.getItemCharacteristics)

router.get('/items/highlighted', itemController.highlighted)
router.get('/items/newests', itemController.newests)
router.post('/items/show-cart', itemController.showItemById)
router.get('/items/search', itemController.search)
router.get('/items/:id', itemController.show)




export default router