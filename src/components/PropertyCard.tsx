import { Property } from "@/types/property";
import Image from "next/image";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
        <Image
          src={property.image ?? "/placeholder.jpg"}
          alt={property.title}
          width={600}
          height={192}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      <h3 className="text-xl font-bold">{property.title}</h3>
      <p className="text-gray-600">{property.description}</p>
      <p className="text-lg font-semibold">₹{property.price.toLocaleString()}</p>
      <p className="text-gray-500">{property.location}</p>
      <p className="text-sm text-gray-400">
        Posted on {new Date(property.createdAt.seconds * 1000).toLocaleDateString()}
      </p>
    </div>
  );
}