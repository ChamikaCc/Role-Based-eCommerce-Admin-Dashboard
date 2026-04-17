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
    await sequelize.sync(); // make sure tables exist then it's safe for seed run

    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";
    const adminName = process.env.ADMIN_NAME || "System Admin";

    const existingAdmin = await User.findOne({
      where: { email: adminEmail }, //Check whether admin already registered?
    });

    if (existingAdmin) {
      console.log("Admin already exists.Seeding skipped.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 15); // Hashes plain password using bcrypt with salt rounds 15.we never store plain password in DB.

    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully!");
    console.log("Email: " + adminEmail);
    console.log("Password: (from.env ADMIN_PASSWORD)");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed admin:", error.message);
    process.exit(1);
  }
}

seedAdmin();
