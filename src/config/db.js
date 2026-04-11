// This file Connect Node.js app to PostgreSQL
import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

// Reads .env file and loads values into process.env
dotenv.config();

//creating a connection to database
const sequelize = new Sequelize(
    process.env.DB_NAME, // core credentials
    process.env.DB_USER,
    process.env.DB_PASS,

    {   
        host: process.env.DB_HOST,  // additional db connection settings
        port: Number(process.env.DB_PORT || 5432), // if DB_PORT is missing, it uses 5432 as default
        dialect: 'postgres',
        logging: false, 
    }
)

export default sequelize;
