import admin from "firebase-admin";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

if (!admin.apps.length) {
  const serviceAccountPath = process.env.FIREBASE_ADMIN_SDK_PATH;
  if (!serviceAccountPath) {
    throw new Error("FIREBASE_ADMIN_SDK_PATH environment variable is not set");
  }
  const resolvedPath = path.resolve(process.cwd(), serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(resolvedPath),
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();