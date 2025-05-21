// src/app/dashboard/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin"); // If not logged in, redirect to sign-in
  }

  return (
    <div className="h-screen">
      <h1 className="m-auto w-fit">Welcome, {session.user?.name}!</h1>
      <p className="m-auto w-fit">This is a protected page only visible to logged-in users.</p>
      <LogoutButton/>
    </div>
  );
}
