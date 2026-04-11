import sequlize from '../config/db.js'; 
import User from './user.js';

const db ={
    sequlize,
    User,
}

export default db;
export {sequlize, User};