"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page(): JSX.Element {
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();

  useEffect(() => {
    // Redirect to signIn page if the user is not logged in
    if (user == null) {
      router.push("/signin");
    }
  }, [user, router]);

  return <div>NEWS</div>;
}

export default Page;
