import AdminJS, { ComponentLoader } from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSSequelize from "@adminjs/sequelize";
import session from "express-session";
import bcrypt from "bcrypt";

import {
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Setting,
} from "../models/index.js";

//registering sequelize adapter for AdminJS
AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

//role helper functions to control access to resources and pages in AdminJS
function isAdmin(context) {
  return context.currentAdmin?.role === "admin";
}
function isAdminOrUser(context) {
  return (
    context.currentAdmin?.role === "admin" ||
    context.currentAdmin?.role === "user"
  );
}
function isSettingsPageVisible(context) {
  return context.currentAdmin?.role === "admin";
}

//custom component loader for AdminJS dashboard and pages
const componentLoader = new ComponentLoader();

const dashboardComponent = componentLoader.add(
  "DashboardPage",
  "../admin/pages/dashboard.jsx"
);

const settingsComponent = componentLoader.add(
  "SettingsPage",
  "../admin/pages/settings.jsx"
);

//adminjs instance with configuration for resources, dashboard, and custom pages
export const adminJs = new AdminJS({
  rootPath: "/admin",
  componentLoader: componentLoader,

  dashboard: {
    component: dashboardComponent,
  },

  pages: {
    SettingsPage: {
      label: "Settings",
      component: settingsComponent,
      isVisible: isSettingsPageVisible,
    },
  },

  resources: [
    {
      resource: User,
      options: {
        navigation: "Management",
        properties: {
          password: {
            isVisible: {
              list: false,
              filter: false,
              show: false,
              edit: false,
            },
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
    {
      resource: Category,
      options: {
        navigation: "Catalog",
        actions: {
          list: { isAccessible: isAdminOrUser, isVisible: isAdminOrUser },
          show: { isAccessible: isAdminOrUser, isVisible: isAdminOrUser },
          new: { isAccessible: isAdmin, isVisible: isAdmin },
          edit: { isAccessible: isAdmin, isVisible: isAdmin },
          delete: { isAccessible: isAdmin, isVisible: isAdmin },
          bulkDelete: { isAccessible: isAdmin, isVisible: isAdmin },
        },
      },
    },
    {
      resource: Product,
      options: {
        navigation: "Catalog",
        actions: {
          list: { isAccessible: isAdminOrUser, isVisible: isAdminOrUser },
          show: { isAccessible: isAdminOrUser, isVisible: isAdminOrUser },
          new: { isAccessible: isAdmin, isVisible: isAdmin },
          edit: { isAccessible: isAdmin, isVisible: isAdmin },
          delete: { isAccessible: isAdmin, isVisible: isAdmin },
          bulkDelete: { isAccessible: isAdmin, isVisible: isAdmin },
        },
      },
    },
    {
      resource: Order,
      options: {
        navigation: "Sales",
        actions: {
          list: { isAccessible: isAdminOrUser, isVisible: isAdminOrUser },
          show: { isAccessible: isAdminOrUser, isVisible: isAdminOrUser },
          new: { isAccessible: isAdmin, isVisible: isAdmin },
          edit: { isAccessible: isAdmin, isVisible: isAdmin },
          delete: { isAccessible: isAdmin, isVisible: isAdmin },
          bulkDelete: { isAccessible: isAdmin, isVisible: isAdmin },
        },
      },
    },
    {
      resource: OrderItem,
      options: {
        navigation: "Sales",
        actions: {
          list: { isAccessible: isAdminOrUser, isVisible: isAdminOrUser },
          show: { isAccessible: isAdminOrUser, isVisible: isAdminOrUser },
          new: { isAccessible: isAdmin, isVisible: isAdmin },
          edit: { isAccessible: isAdmin, isVisible: isAdmin },
          delete: { isAccessible: isAdmin, isVisible: isAdmin },
          bulkDelete: { isAccessible: isAdmin, isVisible: isAdmin },
        },
      },
    },
    {
      resource: Setting,
      options: {
        navigation: "System",
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

//session middleware configuration for AdminJS authentication
export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "super-secret-session-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
  },
});

//authenticate admin users for AdminJS login
async function authenticateAdmin(email, password) {
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    return null;
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
}

//build 
export function buildAdminRouter() {
  return AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
      authenticate: authenticateAdmin,
      cookieName: "adminjs",
      cookiePassword:
        process.env.COOKIE_SECRET || "superStrongSecret1234!",
    },
    null,
    {
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || "SuperSecret4567!",
    }
  );
}