import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Extend the Session and User types to include 'id'
declare module "next-auth" {
  interface User {
    id: string;
  }
  interface Session {
    user: User;
  }
}

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description, price, location, image } = await req.json();

  if (!session.user || !session.user.id) {
    return NextResponse.json({ error: "User information missing in session" }, { status: 400 });
  }

  const property = await prisma.property.create({
    data: {
      title,
      description,
      price,
      location,
      image,
      userId: parseInt(session.user.id),
    },
  });

  return NextResponse.json(property, { status: 201 });
}