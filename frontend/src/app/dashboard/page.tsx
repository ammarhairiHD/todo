"use client";

import getTokenData from "@/lib/auth";
import ListTodo from "@/components/todo/ListToDo";
import ProfileCard from "@/components/dashboard/ProfileCard";
import AddTask from "@/components/todo/AddTask";
import { useEffect, useState } from "react";
import router from "next/router";
import { TokenData } from "@/types/tokenData";

export default function Dashboard() {
  const [user, setUser] = useState<TokenData | null>(null);

  useEffect(() => {
    const tokenData = getTokenData();
    if (tokenData) {
      setUser({
        username: tokenData.username,
        email: tokenData.email,
      });
    }

    if (!tokenData) {
      router.push("/");
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <section className="flex flex-col items-center min-h-screen bg-gray-900 text-white py-10 px-5">
      <ProfileCard user={user} />
      <AddTask user={user} />
      <ListTodo />
    </section>
  );
}
