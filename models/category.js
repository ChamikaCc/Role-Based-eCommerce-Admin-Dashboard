import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define('Category',
 {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,    
    },
 },{
    tableName:'categories',
    timestamps:true,
    underscored:true,
 }
)
export default Category;