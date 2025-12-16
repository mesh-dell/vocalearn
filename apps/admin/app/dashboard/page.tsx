"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Context/useAuth";

export default function AdminDashboardPage() {
  const { user, token, logout } = useAuth(); // assuming your useAuth gives { user, token }
  const router = useRouter();

  useEffect(() => {
    // If not logged in, redirect to login
    if (!token) {
      router.push("/login");
      return;
    }

    // If logged in but not admin
    if (user?.role !== "ADMIN") {
      router.push("/login");
    }
  }, [token, user, router]);

  // Optional: while checking authentication, avoid flicker
  if (!token || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Manage staff, classes, and system settings for your LMS.
        </p>
        <Button className="mt-4" onClick={logout}>Logout</Button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Staff Management */}
        <Card className="border border-gray-200 hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Staff</CardTitle>
            <Users className="text-orange-500 h-6 w-6" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              View, add, and manage all staff members in the system.
            </p>
            <Link href="/dashboard/staff">
              <Button className="bg-orange-500 text-white hover:bg-orange-600">
                Manage Staff
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Classes Management */}
        <Card className="border border-gray-200 hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Classes</CardTitle>
            <GraduationCap className="text-blue-600 h-6 w-6" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Create and assign classes to staff and students.
            </p>
            <Link href="/dashboard/classes">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Manage Classes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
