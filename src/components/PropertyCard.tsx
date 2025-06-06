import Image from "next/image";

type Property = {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  image?: string;
};

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="border rounded-lg p-4 shadow-md font-[family-name:var(--font-geist-sans)]">
      <Image
        src={property.image || "/images/placeholder.jpg"}
        alt={property.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{property.title}</h2>
      <p className="text-gray-600">{property.description}</p>
      <p className="text-lg font-bold mt-2">${property.price}</p>
      <p className="text-gray-500">{property.location}</p>
    </div>
  );
}