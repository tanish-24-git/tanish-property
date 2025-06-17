"use client";

   import { useState } from "react";
   import { db } from "@/lib/firebase";
   import { collection, addDoc } from "firebase/firestore";
   import { useSession } from "next-auth/react";
   import Image from "next/image";

   export default function PostPropertyForm() {
     const { data: session } = useSession();
     const [formData, setFormData] = useState({
       title: "",
       description: "",
       price: "",
       location: "",
       image: "",
     });
     const [error, setError] = useState("");
     const [success, setSuccess] = useState("");
     const [imageError, setImageError] = useState("");

     const handleChange = (
       e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
     ) => {
       const { name, value } = e.target;
       setFormData({ ...formData, [name]: value });

       if (name === "image") {
         if (value === "") {
           setImageError("");
         } else if (!isValidImageUrl(value)) {
           setImageError("Please enter a valid image URL (e.g., https://example.com/image.jpg)");
         } else {
           setImageError("");
         }
       }
     };

     const isValidImageUrl = (url: string) => {
       try {
         if (!/^https?:\/\/.*/i.test(url)) return false;
         return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
       } catch {
         return false;
       }
     };

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       if (!session) {
         setError("You must be logged in to post a property.");
         return;
       }
       if (imageError) {
         setError("Please fix the image URL error before submitting");
         return;
       }

       try {
         await addDoc(collection(db, "properties"), {
           title: formData.title,
           description: formData.description,
           price: parseFloat(formData.price),
           location: formData.location,
           image: formData.image || "https://via.placeholder.com/150",
           createdAt: new Date(),
           userId: session.user?.email,
         });
         setSuccess("Property posted successfully!");
         setFormData({ title: "", description: "", price: "", location: "", image: "" });
         setError("");
         setImageError("");
       } catch (err) {
         setError(
           "Failed to post property: " +
             (err instanceof Error ? err.message : String(err))
         );
       }
     };

     return (
       <div className="max-w-md mx-auto p-4">
         <h2 className="text-2xl font-bold mb-4">Post a Property</h2>
         {error && <p className="text-red-500 mb-4">{error}</p>}
         {success && <p className="text-green-500 mb-4">{success}</p>}
         <form onSubmit={handleSubmit} className="space-y-4">
           <div>
             <label htmlFor="title" className="block text-sm font-medium">Title</label>
             <input
               id="title"
               name="title"
               type="text"
               value={formData.title}
               onChange={handleChange}
               required
               className="mt-1 block w-full border rounded-md p-2"
             />
           </div>
           <div>
             <label htmlFor="description" className="block text-sm font-medium">Description</label>
             <textarea
               id="description"
               name="description"
               value={formData.description}
               onChange={handleChange}
               required
               className="mt-1 block w-full border rounded-md p-2"
             />
           </div>
           <div>
             <label htmlFor="price" className="block text-sm font-medium">Price</label>
             <input
               id="price"
               name="price"
               type="number"
               value={formData.price}
               onChange={handleChange}
               required
               className="mt-1 block w-full border rounded-md p-2"
             />
           </div>
           <div>
             <label htmlFor="location" className="block text-sm font-medium">Location</label>
             <input
               id="location"
               name="location"
               type="text"
               value={formData.location}
               onChange={handleChange}
               required
               className="mt-1 block w-full border rounded-md p-2"
             />
           </div>
           <div>
             <label htmlFor="image" className="block text-sm font-medium">Image URL (optional)</label>
             <input
               id="image"
               name="image"
               type="text"
               value={formData.image}
               onChange={handleChange}
               className="mt-1 block w-full border rounded-md p-2"
             />
             {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
             {formData.image && !imageError && (
               <div className="mt-2">
                 <Image
                   src={formData.image}
                   alt="Preview"
                   width={128}
                   height={128}
                   className="w-32 h-32 object-cover rounded-md mt-1"
                   onError={() => setImageError("Failed to load image. Please check the URL.")}
                   unoptimized
                 />
               </div>
             )}
           </div>
           <button
             type="submit"
             className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
             disabled={!!imageError}
           >
             Submit
           </button>
         </form>
       </div>
     );
   }