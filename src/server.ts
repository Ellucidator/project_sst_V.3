import dotenv from 'dotenv';
dotenv.config();

import * as schedule from 'node-schedule';
import express from 'express';
import {sequelize} from './db/index.js';
import { adminJs, adminJsRouter } from './adminjs/index.js';
import router from './routes.js';
import cors from 'cors'
import { PORT } from './config/enviroment.js';
import { nodeScheduleServices } from './db/services/nodeScheduleServices.js';

const app = express();

app.use(adminJs.options.rootPath,adminJsRouter);
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(router);

const rule = new schedule.RecurrenceRule();
rule.hour = 1;
rule.minute = 0;
rule.tz = 'America/Sao_Paulo';
schedule.scheduleJob(rule,nodeScheduleServices)

app.listen(PORT, () => {
    sequelize.authenticate().then(() => {
        console.log('Database connected!')
    });

    console.log(`Server running on port ${PORT}`)
});