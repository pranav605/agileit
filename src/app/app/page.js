'use client';

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import axios from "axios";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  // useEffect(() => {
  //   if (session?.user) {
  //     const syncUser = async () => {
  //       try {
  //         await axios.post("http://localhost:5000/api/auth/sync", {
  //           email: session.user.email,
  //           name: session.user.name,
  //           image: session.user.image,
  //           provider: session.user.provider || 'unknown',
  //         });
  //       } catch (err) {
  //         console.error("User sync failed:", err);
  //       }
  //     };
  //     syncUser();
  //   }
  // }, [session]);

  if (status === "loading" || status === "unauthenticated") {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-screen">
      <h1 className="w-fit text-4xl">Welcome, {session.user?.name}!</h1>
      <p className="w-fit">This is a protected page only visible to logged-in users.</p>
      <LogoutButton />
    </div>
  );
}
