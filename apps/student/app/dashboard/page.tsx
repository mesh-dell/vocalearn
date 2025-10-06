"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/Context/useAuth";
import { CourseGet } from "@/Models/Course"; // use the type we defined
import { coursesGetAPI } from "@/Services/CourseService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, isLoggedIn } = useAuth();
  const isAuthenticated = isLoggedIn();
  const [courses, setCourses] = useState<CourseGet[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await coursesGetAPI();
      if (response?.data) {
        setCourses(response.data);
      }
    };

    if (isAuthenticated) {
      fetchCourses();
    }
  }, [isAuthenticated]);
  
  if (!isAuthenticated || !user) {
    return (
      <main className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome to VocaLearn
        </h1>
        <p className="mt-4 text-gray-600">
          Please{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            log in
          </Link>{" "}
          to access your dashboard.
        </p>
      </main>
    );
  }
  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Welcome Back, {user?.email}!
        </h1>
        <p className="text-gray-600">
          Ready to continue your learning journey?
        </p>
      </div>

      {/* My Courses Section */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">My Courses</h2>

        {courses.length === 0 ? (
          <p className="text-gray-600">No courses available yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <Card
                key={index}
                className="border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="flex h-full flex-col justify-between p-6">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      {course.courseName}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      {course.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Level:{" "}
                      <span className="font-medium">
                        {course.courseOverview.skillLevel}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Duration:{" "}
                      <span className="font-medium">
                        {course.courseOverview.duration}
                      </span>
                    </p>
                  </div>
                  <Link href={`/dashboard/course/${course.courseOverview.id}`}>
                    <Button className="mt-6 w-full bg-orange-500 text-white hover:bg-orange-600">
                      View Course
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
