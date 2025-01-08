"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+ with the app directory
import { SignIn, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (!user) {
    return <SignIn />;
  }

  return null; // While redirecting, don't render anything
}
