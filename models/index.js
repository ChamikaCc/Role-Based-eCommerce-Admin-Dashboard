import sequlize from '../config/db.js'; 
import User from './user.js';

//here contains all the models and sequlize instance to be exported together
const container ={
    sequlize,
    User,
    Category,
    Product,
    Order,
    OrderItem,
    Setting,
}

export default container;
export {
    sequlize, 
    User,
    Category,
    Product,
    Order,
    OrderItem,
    Setting
};