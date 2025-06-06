import { PrismaClient } from "@prisma/client";
import PropertyCard from "@/components/PropertyCard";

const prisma = new PrismaClient();

export default async function Posts() {
  const properties = await prisma.property.findMany();

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-2xl font-bold mb-4">Available Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}