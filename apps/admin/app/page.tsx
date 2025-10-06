"use client";

import { useEffect } from "react";
import { useAuth } from "@/Context/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome to Vocalearn Admin
      </h1>
      <p className="text-gray-600 max-w-md">
        Manage staff, classes, and system-wide configurations from your admin
        dashboard.
      </p>

      <div className="flex gap-4">
        <Link href="/login">
          <Button className="bg-orange-500 text-white hover:bg-orange-600">
            Go to Login
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">Go to Dashboard</Button>
        </Link>
      </div>

      <footer className="text-sm text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} Vocalearn Admin Console
      </footer>
    </div>
  );
}
