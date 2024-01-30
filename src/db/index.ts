import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'marcelo_sequelize',
    password: '1010',
    database: 'project_sst',
    define: {
        underscored: true
    }
});