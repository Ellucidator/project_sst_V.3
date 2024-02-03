import express from 'express';
import { categoriesController } from './db/controllers/categorieController.js';

const router = express.Router();

router.get('/categories',categoriesController.list)

export default router