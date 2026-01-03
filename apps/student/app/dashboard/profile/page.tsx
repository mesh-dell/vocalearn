"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/Context/useAuth";
import { getActiveWeek } from "@/Services/GamifyService";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const students = [
    { id: 1, name: "Alex Rivera", points: 2850, rank: 1 },
    { id: 2, name: "Jordan Smith", points: 2720, rank: 2 },
    { id: 3, name: "Taylor Wong", points: 2680, rank: 3 },
    { id: 4, name: "Morgan Freeman", points: 2450, rank: 4 },
    { id: 5, name: "Casey Jones", points: 2310, rank: 5 },
    { id: 6, name: "Sam Wilson", points: 2100, rank: 6 },
  ];

  const { user, token, logout } = useAuth();
  // const [weeklyData, setWeeklyData] = useState<any>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!token) return;

  //   const fetchWeeklyData = async () => {
  //     try {
  //       const res = await getActiveWeek(token);
  //       setWeeklyData(res);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchWeeklyData();
  // }, [token]);

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
      <Button className="cursor-pointer bg-blue-500" onClick={logout}>
        Logout
      </Button>

      {/* Incomplete Profile Warning */}
      {incomplete && (
        <Card className="border border-yellow-300 bg-yellow-50">
          <CardContent className="space-y-2 p-4">
            <h3 className="text-lg font-semibold text-yellow-800">
              Complete Your Profile
            </h3>
            <p className="text-yellow-700">
              Your profile is incomplete. Please provide your first and last
              name.
            </p>
            <Link
              href="/dashboard/profile/complete"
              className="mt-2 inline-block rounded bg-yellow-600 px-4 py-2 text-sm text-white hover:bg-yellow-700"
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
            <h2 className="text-lg font-semibold text-gray-800">First Name</h2>
            <p className="text-gray-600">{user.firstName || "—"}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">Last Name</h2>
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

      <div className="mx-auto my-10 max-w-2xl overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
          <p className="mt-1 text-sm tracking-widest text-indigo-100 uppercase">
            Top Performers
          </p>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between p-5 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                {/* Rank Badge */}
                <div className="flex w-10 justify-center">
                  {student.rank === 1 ? (
                    <span className="text-xl font-bold text-yellow-500">
                      1st
                    </span>
                  ) : student.rank === 2 ? (
                    <span className="text-xl font-bold text-gray-400">2nd</span>
                  ) : student.rank === 3 ? (
                    <span className="text-xl font-bold text-amber-600">
                      3rd
                    </span>
                  ) : (
                    <span className="font-medium text-gray-500">
                      {student.rank}th
                    </span>
                  )}
                </div>

                {/* Avatar Placeholder */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200 bg-indigo-100 font-semibold text-indigo-700">
                  {student.name.charAt(0)}
                </div>

                {/* Name */}
                <span className="font-semibold text-gray-800">
                  {student.name}
                </span>
              </div>

              {/* Points */}
              <div className="text-right">
                <span className="block text-lg font-bold text-indigo-600">
                  {student.points.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-gray-400 uppercase">
                  Points
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Weekly Gamify Data 
      
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
      */}
    </div>
  );
}
