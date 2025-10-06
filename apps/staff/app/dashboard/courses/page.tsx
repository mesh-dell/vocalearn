"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { coursesGetAPI } from "@/Services/CourseService"; // 🔹 Fetch all courses
import { CourseGet } from "@/Models/Course"; // 🔹 Your Course model

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseGet[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await coursesGetAPI();
        if (response?.data) {
          setCourses(response.data);
        } else if (Array.isArray(response)) {
          setCourses(response);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="space-y-8 container mx-auto px-6 py-10 ">
      {/* Header */}
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Courses</h1>
        <p className="text-gray-600">
          Browse available courses or create a new one.
        </p>
      </div>

      {/* Courses List */}
      {courses.length === 0 ? (
        <p className="text-gray-600">No courses available yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card
              key={course.courseOverview.id}
              className="border border-gray-200 shadow-sm transition hover:shadow-md"
            >
              <CardContent className="flex flex-col justify-between p-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {course.courseName}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    {course.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration:{" "}
                    <span className="font-medium">
                      {course.courseOverview.duration}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Skill Level:{" "}
                    <span className="font-medium">
                      {course.courseOverview.skillLevel}
                    </span>
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <Link href={`/dashboard/courses/${course.courseOverview.id}`}>
                    <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
                      View Course
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Course CTA */}
      <div>
        <Link href="/dashboard/courses/create">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            + Create New Course
          </Button>
        </Link>
      </div>
    </div>
  );
}
