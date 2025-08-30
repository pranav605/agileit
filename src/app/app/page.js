'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ThemedButton from "@/components/ThemedButton";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    } else if (status === "authenticated") {
      setMounted(true);
    }
  }, [status, router]);

  // Fetch tasks
  useEffect(() => {
    if (session?.user?.email) {
      const fetchTasks = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/tasks/getTasks/${session.user.email}`);
          setTasks(res.data || []);
        } catch (err) {
          console.error("Failed to fetch tasks:", err);
        }
      };
      fetchTasks();
    }
  }, [session]);

  if (!mounted) return null;

  return (
    <div className="w-full h-full p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Dashboard
        </h1>
        <LogoutButton />
      </div>

      {/* User Info & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* User Card */}
        <div className="flex items-center gap-4 p-4 rounded-md border border-gray-200 dark:border-zinc-800">
          <img
            src={session?.user?.image || "/images/avatar.png"}
            alt="User Avatar"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="font-semibold">{session?.user?.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{session?.user?.email}</p>
          </div>
        </div>

        {/* Completed */}
        <div className="flex flex-col items-center justify-center p-4 rounded-md border border-gray-200 dark:border-zinc-800">
          <CheckCircleIcon className="h-6 w-6 text-green-500 mb-1" />
          <p className="text-2xl font-bold">{tasks.filter(t => t.status === "completed").length}</p>
          <span className="text-sm text-gray-500 dark:text-gray-400">Completed</span>
        </div>

        {/* Pending */}
        <div className="flex flex-col items-center justify-center p-4 rounded-md border border-gray-200 dark:border-zinc-800">
          <ClockIcon className="h-6 w-6 text-yellow-500 mb-1" />
          <p className="text-2xl font-bold">{tasks.filter(t => t.status === "pending").length}</p>
          <span className="text-sm text-gray-500 dark:text-gray-400">Pending</span>
        </div>
      </div>

      {/* Tasks Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {tasks.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No tasks assigned yet.</p>
          ) : (
            tasks.map((task, idx) => (
              <div
                key={idx}
                className="p-4 rounded-md border border-gray-200 dark:border-zinc-800 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors"
              >
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {task.description || "No description"}
                </p>
                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
