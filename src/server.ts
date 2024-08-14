import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import {sequelize} from './db/index.js';
import { adminJs, adminJsRouter } from './adminjs/index.js';
import router from './routes.js';
import cors from 'cors'
import { PORT } from './config/enviroment.js';

const app = express();

app.use(adminJs.options.rootPath,adminJsRouter);
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(router);



app.listen(PORT, () => {
    sequelize.authenticate().then(() => {
        console.log('Database connected!')
    });

    console.log(`Server running on port ${PORT}`)
});