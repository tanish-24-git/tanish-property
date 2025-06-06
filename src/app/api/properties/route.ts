import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session:", session);
    if (!session?.user?.email) {
      console.log("Unauthorized: No session or email");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    console.log("User:", user);
    if (!user) {
      console.log("User not found for email:", session.user.email);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = await request.json();
    console.log("Received data:", data);

    const { title, description, price, location, image } = data;
    if (!title || !description || !price || !location) {
      console.log("Missing required fields:", { title, description, price, location });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (isNaN(parseFloat(price))) {
      console.log("Invalid price format:", price);
      return NextResponse.json({ error: "Invalid price format" }, { status: 400 });
    }

    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        location,
        image: image || null,
        userId: user.id,
      },
    });
    console.log("Created property:", property);

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}