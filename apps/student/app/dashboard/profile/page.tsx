"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/Context/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">No user logged in.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Header */}
      <header className="text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600">View your account details</p>
      </header>

      {/* Profile Card */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Email</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Admission ID
            </h2>
            <p className="text-gray-600">{user.admissionId}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Admission Year
              </h2>
              <p className="text-gray-600">{user.admissionYear}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Gender</h2>
              <p className="text-gray-600">{user.gender}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">Class Name</h2>
            <p className="text-gray-600">{user.className}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
