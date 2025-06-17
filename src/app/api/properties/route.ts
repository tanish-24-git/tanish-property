import { NextResponse } from "next/server";
   import { db } from "@/lib/firebase";
   import { collection, addDoc } from "firebase/firestore";
   import { getServerSession } from "next-auth";
   import { authOptions } from "@/lib/auth";
   import { Property } from "@/types/property";

   export async function POST(request: Request) {
     try {
       const session = await getServerSession(authOptions);
       if (!session?.user?.email) {
         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
       }

       const data = await request.json();
       const { title, description, price, location, image } = data;
       if (!title || !description || !price || !location) {
         return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
       }

       const property = await addDoc(collection(db, "properties"), {
         title,
         description,
         price: parseFloat(price),
         location,
         image: image || "https://via.placeholder.com/150",
         createdAt: new Date(),
         userId: session.user.email,
       });

       return NextResponse.json({ id: property.id, ...data } as Property, { status: 201 });
     } catch (error) {
       console.error("API error:", error);
       return NextResponse.json({ error: "Internal server error" }, { status: 500 });
     }
   }