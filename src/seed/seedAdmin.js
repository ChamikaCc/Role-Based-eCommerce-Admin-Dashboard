import dotenv from "dotenv";
import sequelize from "../config/db.js";
import "../models/index.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";

dotenv.config();

async function seedAdmin() {
  try {
    await sequelize.authenticate();
    console.log("Database connected for seeding");
    await sequelize.sync();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";
    const firstName = process.env.ADMIN_FIRST_NAME || "System";
    const lastName = process.env.ADMIN_LAST_NAME || "Admin";

    const existingAdmin = await User.findOne({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log("Admin already exists. Seeding skipped.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      firstName,
      lastName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully!");
    console.log("Email:", adminEmail);
    console.log("Password: (from .env ADMIN_PASSWORD)");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed admin:", error.message);
    process.exit(1);
  }
}

seedAdmin();