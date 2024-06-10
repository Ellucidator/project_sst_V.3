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
import { companyInformationController } from './db/controllers/companyInformationController.js';

const router = express.Router();

router.get('/company-information', companyInformationController.show)

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/verify-login', authController.verifyLogin)

router.post('/create-user', userController.createUser)
router.get('/user',ensureAuth,userController.show)
router.put('/user',ensureAuth,userController.updateUser)

router.post('/user/favorite',ensureAuth, userController.addFavorite)
router.get('/user/show/favorites',ensureAuth,userController.showFavorites)
router.delete('/user/favorite/:id',ensureAuth, userController.deleteFavorite)

router.put('/user/address/:id',ensureAuth,addressController.activated)
router.post('/user/address',ensureAuth,addressController.create)
router.get('/user/address/:id',ensureAuth,addressController.showAddress)
router.get('/user/addresses',ensureAuth,addressController.listByUserId)
router.delete('/user/address/:id',ensureAuth,addressController.delete)

router.post('/user/purchase/:id',ensureAuth,purchaseController.addPurchase)
router.get('/user/show/purchases',ensureAuth,purchaseController.showPurchase)
router.get('/user/show/purchase/:id',ensureAuth,purchaseController.showPurchaseById)

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