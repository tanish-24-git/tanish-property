import { db } from "@/lib/firebase";
   import { collection, getDocs } from "firebase/firestore";
   import PropertyCard from "@/components/PropertyCard";
   import { Property } from "@/types/property";

   export default async function Posts() {
     let properties: Property[] = [];
     try {
       const querySnapshot = await getDocs(collection(db, "properties"));
       properties = querySnapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
       } as Property));
       console.log("Fetched properties:", properties);
     } catch (error) {
       console.error("Error fetching properties:", error);
       return (
         <div className="font-[family-name:var(--font-geist-sans)]">
           <h1 className="text-3xl font-bold text-center my-8">Properties</h1>
           <p className="text-center text-red-500">Failed to load properties. Please try again later.</p>
         </div>
       );
     }

     return (
       <div className="font-[family-name:var(--font-geist-sans)]">
         <h1 className="text-3xl font-bold text-center my-8">Properties</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
           {properties.length > 0 ? (
             properties.map((property) => (
               <PropertyCard key={property.id} property={property} />
             ))
           ) : (
             <p className="text-center col-span-full">No properties available.</p>
           )}
         </div>
       </div>
     );
   }