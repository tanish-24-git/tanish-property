import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>Please log in to access the dashboard.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, {session.user?.name}!</p>
      <Link href="/admin/post">
        <button className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Post New Property
        </button>
      </Link>
    </div>
  );
}