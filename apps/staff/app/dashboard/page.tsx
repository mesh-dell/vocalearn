"use client";

import { useAuth } from "@/Context/useAuth"; // assuming you store user in auth context
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function StaffDashboardPage() {
  const { user } = useAuth(); // example { firstName, lastName, email, role, department }

  if (!user) {
    return (
      <main className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to VocaLearn</h1>
        <p className="mt-4 text-gray-600">
          Please <Link href="/login" className="text-blue-600 hover:underline">log in</Link> to access your staff dashboard.
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-6 py-10 space-y-10">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user.firstName} {user.lastName}!
        </h1>
        <p className="text-gray-600">Manage your courses, assignments, and interact with students.</p>
      </div>

      {/* User Profile Summary */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Role</p>
            <p className="text-gray-900">{user.role}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Department</p>
            <p className="text-gray-900">{user.department}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="text-gray-900">{user.phoneNumber || "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/courses">
          <Card className="hover:shadow-md transition border border-gray-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900">Manage Courses</h3>
              <p className="text-gray-600 text-sm">Create and edit courses for your students</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/assignments">
          <Card className="hover:shadow-md transition border border-gray-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900">Assignments</h3>
              <p className="text-gray-600 text-sm">Create, view, and grade submissions</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/chat">
          <Card className="hover:shadow-md transition border border-gray-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900">Student Chat</h3>
              <p className="text-gray-600 text-sm">Communicate with your students in real-time</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  );
}

