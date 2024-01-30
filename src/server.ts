import express from 'express';
import {sequelize} from './db/index.js';
import { adminJs, adminJsrouter } from './adminjs/index.js';


const app = express();

app.use(adminJs.options.rootPath,adminJsrouter)

app.use(express.static('public'));
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    sequelize.authenticate().then(() => {
        console.log('Database connected!')
    });

    console.log(`Server running on port ${PORT}`)
});