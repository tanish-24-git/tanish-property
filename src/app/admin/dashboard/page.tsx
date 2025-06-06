import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import PostPropertyForm from "@/components/PostPropertyForm";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-2xl font-bold text-center mt-6">Admin Dashboard</h2>
      <PostPropertyForm />
    </div>
  );
}