import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "admin@tanishproperty.com";
  const hashedPassword = await bcrypt.hash("SecurePassword123!", 10);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: "Admin",
      },
    });
    console.log("Admin user created");
  } else {
    console.log("Admin user already exists");
  }
}

seed().catch((e) => {
  console.error("Seed error:", e);
  process.exit(1);
}).finally(() => prisma.$disconnect());