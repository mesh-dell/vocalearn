"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/Context/useAuth";
import { getActiveWeek } from "@/Services/GamifyService";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, token } = useAuth();
  const [weeklyData, setWeeklyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchWeeklyData = async () => {
      try {
        const res = await getActiveWeek(token);
        setWeeklyData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, [token]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">No user logged in.</p>
      </div>
    );
  }

  // Check incomplete profile
  const incomplete = !user.firstName || !user.lastName;

  return (
    <div className="mx-auto max-w-2xl space-y-8 pb-20">

      {/* Incomplete Profile Warning */}
      {incomplete && (
        <Card className="border border-yellow-300 bg-yellow-50">
          <CardContent className="p-4 space-y-2">
            <h3 className="text-lg font-semibold text-yellow-800">
              Complete Your Profile
            </h3>
            <p className="text-yellow-700">
              Your profile is incomplete. Please provide your first and last
              name.
            </p>
            <Link
              href="/dashboard/profile/complete"
              className="inline-block mt-2 rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700 text-sm"
            >
              Complete Profile
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <header className="text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600">View your account details</p>
      </header>

      {/* Profile Card */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              First Name
            </h2>
            <p className="text-gray-600">{user.firstName || "—"}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Last Name
            </h2>
            <p className="text-gray-600">{user.lastName || "—"}</p>
          </div>

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

      {/* Weekly Gamify Data */}
      <Card className="border border-blue-200 bg-blue-50">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold text-blue-800">
            Weekly Gamify Progress
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading weekly progress...</p>
          ) : weeklyData ? (
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold text-blue-700">Week Start:</span>{" "}
                {weeklyData.weekStart}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-blue-700">Week End:</span>{" "}
                {weeklyData.weekEnd}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-blue-700">
                  Week Points:
                </span>{" "}
                {weeklyData.weekPoints}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-blue-700">Status:</span>{" "}
                {weeklyData.status}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No weekly gamify data found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

