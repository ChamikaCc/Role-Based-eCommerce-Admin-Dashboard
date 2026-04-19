import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "order_id",
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "unit_price",
    },
    subTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "sub_total",
    },
  },
  {
    tableName: "order_items",
    timestamps: true,
    underscored: true,
  }
);

export default OrderItem;