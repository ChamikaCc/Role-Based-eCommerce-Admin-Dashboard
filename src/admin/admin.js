import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSSequelize from "@adminjs/sequelize";
import bcrypt from "bcrypt";
import {
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Setting,
} from "../models/index.js";

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

function getRole(context) {
  return String(context.currentAdmin?.role || "").trim().toLowerCase();
}

function isAdmin(context) {
  return getRole(context) === "admin";
}

function isAdminOrUser(context) {
  return ["admin", "user"].includes(getRole(context));
}

const adminOrReadOnlyActions = {
  list: { isAccessible: isAdminOrUser, isVisible: isAdminOrUser },
  show: { isAccessible: isAdminOrUser, isVisible: isAdminOrUser },

  new: { isAccessible: isAdmin, isVisible: isAdmin },
  edit: { isAccessible: isAdmin, isVisible: isAdmin },
  delete: { isAccessible: isAdmin, isVisible: isAdmin },
  bulkDelete: { isAccessible: isAdmin, isVisible: isAdmin },
};

export const adminJs = new AdminJS({
  rootPath: "/admin",
  resources: [
    // Users: admin only
    {
      resource: User,
      options: {
        properties: {
          // Hide password in all views
          password: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
        },
        actions: {
          list: { isAccessible: isAdmin, isVisible: isAdmin },
          show: { isAccessible: isAdmin, isVisible: isAdmin },
          new: { isAccessible: isAdmin, isVisible: isAdmin },
          edit: { isAccessible: isAdmin, isVisible: isAdmin },
          delete: { isAccessible: isAdmin, isVisible: isAdmin },
          bulkDelete: { isAccessible: isAdmin, isVisible: isAdmin },
        },
      },
    },

    // Limited resources: admin full, user read-only
    { resource: Category, options: { actions: adminOrReadOnlyActions } },
    { resource: Product, options: { actions: adminOrReadOnlyActions } },
    { resource: Order, options: { actions: adminOrReadOnlyActions } },
    { resource: OrderItem, options: { actions: adminOrReadOnlyActions } },

    // Settings: admin only
    {
      resource: Setting,
      options: {
        actions: {
          list: { isAccessible: isAdmin, isVisible: isAdmin },
          show: { isAccessible: isAdmin, isVisible: isAdmin },
          new: { isAccessible: isAdmin, isVisible: isAdmin },
          edit: { isAccessible: isAdmin, isVisible: isAdmin },
          delete: { isAccessible: isAdmin, isVisible: isAdmin },
          bulkDelete: { isAccessible: isAdmin, isVisible: isAdmin },
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