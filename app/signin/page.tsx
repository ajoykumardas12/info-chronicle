"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import signIn from "@/firebase/auth/signin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handle SignIn
  const handleSignIn = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Sign in with provided email and password
    const { result, error } = await signIn(email, password);

    if (error) {
      console.log(error);
      return;
    }

    console.log(result);

    // Redirect after successful signin
    router.push("/");
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Welcome back!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <Label
                htmlFor="email"
                className="block mb-2 text-base font-medium"
              >
                Email
              </Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
              />
            </div>
            <div className="">
              <Label
                htmlFor="password"
                className="block mb-2 text-base font-medium"
              >
                Password
              </Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4">
        Haven&apos;t signed up yet?{" "}
        <Link href="/signup" className="link">
          Sign Up
        </Link>
      </div>
    </main>
  );
};

export default Page;
