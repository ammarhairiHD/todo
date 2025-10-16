"use client";

import getTokenData from "@/lib/auth";
import { useRouter } from "next/navigation";

interface User {
  username: string;
  name: string;
  email: string;
}

export default function Dashboard() {
  const user = getTokenData();
  const router = useRouter();
  if (!user) return router.push("/");

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.username} 👋</h1>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>
    </section>
  );
}
