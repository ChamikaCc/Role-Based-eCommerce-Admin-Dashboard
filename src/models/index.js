import sequelize from "../config/db.js";
import User from "./user.js";
import Category from "./category.js";
import Product from "./product.js";
import Order from "./order.js";
import OrderItem from "./orderItem.js";
import Setting from "./setting.js";

//add relationships of models

//order and user relationship
User.hasMany(Order, {
  foreignKey: "UserId",
  as: "orders",
}); //one user can place many orders
Order.belongsTo(User, {
  foreignKey: "UserId",
  as: "user",
}); //each order belongs to one user

//order and orderItem relationship
Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "items",
}); //one order can have many order items
OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
}); //each order item belongs to one order

//product and orderItem relationship
Product.hasMany(OrderItem, {
  foreignKey: "productId",
  as: "orderItems",
}); //one product can be in many order items
OrderItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
}); //each order item belongs to one product

//category and product relationship
Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
}); //one category can have many products
Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
}); //each product belongs to one category

//here contains all the models and sequelize instance to be exported together
const container = {
  sequelize,
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Setting,
};

export default container;
export { sequelize, User, Category, Product, Order, OrderItem, Setting };
