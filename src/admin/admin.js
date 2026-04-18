import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSSequelize from "@adminjs/sequelize";
import bcrypt from "bcrypt";
import {
  User, Category, Product, Order, OrderItem, Setting,
} from "../models/index.js";

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

function isAdmin(context) {
  return context.currentAdmin?.role === "admin";
}
function isAdminOrUser(context) {
  return ["admin", "user"].includes(context.currentAdmin?.role);
}

export const adminJs = new AdminJS({
  rootPath: "/admin",
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: { isVisible: { list: false, filter: false, show: false, edit: false } },
        },
        actions: {
          list: { isAccessible: isAdmin, isVisible: isAdmin },
          show: { isAccessible: isAdmin, isVisible: isAdmin },
          new: { isAccessible: isAdmin, isVisible: isAdmin },
          edit: { isAccessible: isAdmin, isVisible: isAdmin },
          delete: { isAccessible: isAdmin, isVisible: isAdmin },
        },
      },
    },
    { resource: Category, options: { actions: { list: { isAccessible: isAdminOrUser, isVisible: isAdminOrUser } } } },
    { resource: Product, options: { actions: { list: { isAccessible: isAdminOrUser, isVisible: isAdminOrUser } } } },
    { resource: Order, options: { actions: { list: { isAccessible: isAdminOrUser, isVisible: isAdminOrUser } } } },
    { resource: OrderItem, options: { actions: { list: { isAccessible: isAdminOrUser, isVisible: isAdminOrUser } } } },
    {
      resource: Setting,
      options: {
        actions: {
          list: { isAccessible: isAdmin, isVisible: isAdmin },
          show: { isAccessible: isAdmin, isVisible: isAdmin },
          new: { isAccessible: isAdmin, isVisible: isAdmin },
          edit: { isAccessible: isAdmin, isVisible: isAdmin },
          delete: { isAccessible: isAdmin, isVisible: isAdmin },
        },
      },
    },
  ],
});

async function authenticateAdmin(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;
  return { id: user.id, email: user.email, role: user.role };
}

export function buildAdminRouter() {
  return AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
      authenticate: authenticateAdmin,
      cookieName: "adminjs",
      cookiePassword: process.env.COOKIE_SECRET || "superStrongSecret1234!",
    },
    null,
    {
      secret: process.env.SESSION_SECRET || "SuperSecret4567!",
      resave: false,
      saveUninitialized: false,
    }
  );
}