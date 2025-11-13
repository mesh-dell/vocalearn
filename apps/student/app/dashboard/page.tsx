"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/Context/useAuth";
import { CourseGet, EnrolledCourse } from "@/Models/Course";
import { coursesGetAPI } from "@/Services/CourseService";
import { fetchEnrolledCoursesAPI } from "@/Services/CourseService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DashboardPage() {
  const { user, token, isLoggedIn } = useAuth();
  const isAuthenticated = isLoggedIn();
  const [courses, setCourses] = useState<CourseGet[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [coursesRes, enrolledRes] = await Promise.all([
          coursesGetAPI(),
          token ? fetchEnrolledCoursesAPI(token) : Promise.resolve([]),
        ]);
        if (coursesRes?.data) setCourses(coursesRes.data);
        if (enrolledRes) setEnrolledCourses(enrolledRes);
      } catch (err) {
        toast.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated, token]);

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

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Welcome */}
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Welcome Back, {user?.email}!
        </h1>
        <p className="text-gray-600">Ready to continue your learning?</p>
      </div>

      {/* Enrolled Courses */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Enrolled Courses
        </h2>

        {enrolledCourses.length === 0 ? (
          <p className="text-gray-600">
            You have not enrolled in any courses yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <Card
                key={course.courseId}
                className="border border-gray-200 shadow-sm transition hover:shadow-md"
              >
                <CardContent className="space-y-3 p-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {course.courseNames}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Progress: {course.progression}
                    </p>
                    <Progress
                      value={parseInt(course.progression.replace("%", ""))}
                      className="mt-2 h-2"
                    />
                  </div>
                  {course.progression == "100%" ? (
                    <p className="text-white bg-orange-500 mt-4 p-1.5 rounded-md text-center">Course finished</p>
                  ) : (
                    <Link href={`/dashboard/course/${course.courseId}`}>
                      <Button className="mt-4 w-full bg-orange-500 text-white hover:bg-orange-600">
                        Continue Learning
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* All Available Courses */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          All Available Courses
        </h2>

        {courses.length === 0 ? (
          <p className="text-gray-600">No courses available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card
                key={course.courseOverview.id}
                className="border border-gray-200 shadow-sm transition hover:shadow-md"
              >
                <CardContent className="flex h-full flex-col justify-between p-6">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      {course.courseName}
                    </h3>
                    <p className="mb-2 text-sm text-gray-600">
                      {course.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Level: {course.courseOverview.skillLevel}
                    </p>
                    <p className="text-sm text-gray-500">
                      Duration: {course.courseOverview.duration}
                    </p>
                  </div>

                  <Link href={`/dashboard/course/${course.courseOverview.id}`}>
                    <Button className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700">
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
