import express from 'express';
import {sequelize} from './db/index.js';
import { adminJs, adminJsRouter } from './adminjs/index.js';
import router from './routes.js';
import cors from 'cors'




const app = express();

app.use(adminJs.options.rootPath,adminJsRouter)

app.use(express.static('public'));
app.use(express.json());
app.use(router)
app.use(cors())

const PORT = 3000;

app.listen(PORT, () => {
    sequelize.authenticate().then(() => {
        console.log('Database connected!')
    });

    console.log(`Server running on port ${PORT}`)
});