"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthForm from "@/components/auth/AuthForm";

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(true);

  const changeCard = () => {
    setShowSignIn((prev) => !prev);
  };

  async function handleSubmit(
    formType: "signin" | "signup",
    data: Record<string, string>
  ) {
    try {
      if (formType === "signin") {
        const sendSignIn = await fetch("/api/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        return await sendSignIn.json();
      } else {
        const sendSignUp = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        return await sendSignUp.json();
      }
    } catch (err) {
      console.error("Error:", err);
      throw new Error("Error Sending Data");
    }
  }

  return (
    <section className="flex flex-col justify-center items-center gap-4 min-h-screen bg-gray-800 relative">
      <Button onClick={changeCard} className="absolute top-10">
        {showSignIn ? "Go to Sign Up" : "Go to Sign In"}
      </Button>

      <div className="perspective-1000">
        {" "}
        <AnimatePresence mode="wait">
          {showSignIn ? (
            <motion.div
              key="signin"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -180, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AuthForm formType="signin" onSubmit={handleSubmit} />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -180, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AuthForm formType="signup" onSubmit={handleSubmit} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
