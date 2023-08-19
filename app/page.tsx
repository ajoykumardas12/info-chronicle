"use client";
import News from "@/components/news/News";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();

  useEffect(() => {
    // Redirect to signIn page if the user is not logged in
    if (user == null) {
      router.push("/signin");
    }
  }, [user, router]);
  return (
    <main className="px-6 py-2">
      <h1 className="text-dark font-bold text-2xl">Top Headlines</h1>
      <News />
    </main>
  );
}
