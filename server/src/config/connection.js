import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Set to true if you have a valid certificate
            }
        }
    })
    : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true
        }
    });

export default sequelize;
