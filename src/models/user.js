   
import sequelize from '../config/db.js';
import {DataTypes} from 'sequelize';

const User=sequelize.define('User',
    {
      id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:  // cuz should hv @ and domain
        {
           isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Password is Required!"
            },
            len:{
                args:[8,128],
            },           
            is:{ //Regex
                args:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,128}$/u,
                msg:"Password must have at least one Capital letter, simple letter and a number with minimum 8 characters"
            }
        }
    },
    role:{
        type:DataTypes.ENUM('admin','user'), //field can only be admin or user
        allowNull:false,
        defaultValue:'user',
    },
    isBlocked:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false,
    },
    img:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'/assets/userLogo.jpg',
    }
    },
    {
        tableName:'users',
        timestamps:true,
        underscored:true
    }
)

export default User;
