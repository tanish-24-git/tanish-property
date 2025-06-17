import { adminAuth, adminDb } from "@/lib/firebase-admin";
import bcrypt from "bcryptjs";

async function seed() {
  const email = "admin@tanishproperty.com";
  const password = "SecurePassword123!";
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    let userRecord = await adminAuth.getUserByEmail(email).catch(() => null);
    if (!userRecord) {
      userRecord = await adminAuth.createUser({
        email,
        password,
      });
      await adminDb.collection("users").doc(userRecord.uid).set({
        email,
        id: userRecord.uid,
        password: hashedPassword,
        name: "Admin",
      });
      console.log("Admin user created successfully");
    } else {
      await adminDb.collection("users").doc(userRecord.uid).update({
        password: hashedPassword,
        name: "Admin",
      });
      console.log("Admin user password reset successfully");
    }
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}
seed()
  .then(() => {
    console.log("Seeding completed successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });