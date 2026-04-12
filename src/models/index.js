import sequelize from '../config/db.js'; 
import User from './user.js';
import Category from './category.js';
import Product from './product.js';
import Order from './order.js';
import OrderItem from './orderItem.js';
import Setting from './setting.js';

//here contains all the models and sequelize instance to be exported together
const container ={
    sequelize,
    User,
    Category,
    Product,
    Order,
    OrderItem,
    Setting,
}

export default container;
export {
    sequelize, 
    User,
    Category,
    Product,
    Order,
    OrderItem,
    Setting
};