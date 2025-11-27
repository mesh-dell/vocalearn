"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CourseGet } from "@/Models/Course";
import {
  coursesGetAPI,
  coursesEnrollAPI,
  coursesModuleCompleteAPI,
} from "@/Services/CourseService";
import { fetchCourseModulesAPI } from "@/Services/CourseService";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useAuth } from "@/Context/useAuth";
import { awardPoints } from "@/Services/GamifyService";

type ModuleType = {
  moduleId: number;
  week: string;
  moduleName: string;
  content: string;
  duration?: string;
  completed?: boolean;
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = Number(params.id);

  const [course, setCourse] = useState<CourseGet | null>(null);
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [loading, setLoading] = useState(false);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const { user, token } = useAuth();

  useEffect(() => {
    const fetchCourseAndModules = async () => {
      try {
        // Fetch all course metadata (title, desc, etc.)
        const response = await coursesGetAPI();
        if (response?.data) {
          const found = response.data.find(
            (c: CourseGet) => c.courseOverview.id === courseId,
          );
          setCourse(found || null);
        }

        // Fetch actual modules from /student/courses/:id/modules
        const moduleData = await fetchCourseModulesAPI(courseId);
        if (Array.isArray(moduleData)) {
          setModules(moduleData);
        }
      } catch {
        toast.error("Failed to load course details.");
      }
    };

    fetchCourseAndModules();
  }, [courseId]);

  const handleEnroll = async () => {
    if (!course || !user) return;

    const courseEnroll = {
      courseId: String(course.courseOverview.id),
      progression: "0%",
      courseName: course.courseName,
      admissionId: user.admissionId,
    };

    setLoading(true);
    try {
      const res = await coursesEnrollAPI(courseEnroll);
      if (res?.status === 200) {
        toast.success(`Successfully enrolled in ${course.courseName}!`);
        router.push("/dashboard");
      }
    } catch {
      toast.error("Enrollment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModuleComplete = async (moduleId: number) => {
    if (!token || !course) return;

    const payload = {
      moduleId,
      courseId: course.courseOverview.id,
    };

    try {
      const res = await coursesModuleCompleteAPI(payload, token);
      if (res) {
        setCompletedModules((prev) => [...prev, moduleId]);
        toast.success("Module marked as complete!");
        await awardPoints("COMPLETE_MODULE", user!.admissionId, user!.lastName);
      }
    } catch {
      toast.error("Failed to mark module complete.");
    }
  };

  if (!course) {
    return (
      <p className="text-center text-gray-600 sm:text-lg">Loading course...</p>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard")}
          className="mb-6"
        >
          ← Back to All Courses
        </Button>

        <Button
          className="mb-6 bg-orange-500 hover:bg-orange-600"
          onClick={handleEnroll}
          disabled={loading}
        >
          {loading ? "Enrolling..." : "Enroll in Course"}
        </Button>
      </div>

      {/* Course Header */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
          {course.courseName}
        </h1>
        <p className="text-sm text-gray-600 sm:text-base lg:text-lg">
          {course.description}
        </p>

        <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2 md:flex md:flex-wrap md:gap-6">
          <span>
            <strong>Level:</strong> {course.courseOverview.skillLevel}
          </span>
          <span>
            <strong>Duration:</strong> {course.courseOverview.duration}
          </span>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Modules</h2>

        {modules.length === 0 ? (
          <p className="text-gray-600">No modules found for this course.</p>
        ) : (
          <div className="space-y-6">
            {modules.map((module, index) => {
              const isCompleted = completedModules.includes(module.moduleId);

              return (
                <div
                  key={module.moduleId}
                  className="w-full rounded-lg border-l-4 border-orange-500 bg-gray-50 p-4 shadow-sm sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="mb-2 text-base font-semibold text-gray-900 sm:text-lg lg:text-xl">
                      {module.week}: {module.moduleName}
                    </h3>

                    <Button
                      variant={isCompleted ? "outline" : "default"}
                      className={`${
                        isCompleted
                          ? "border-green-600 text-green-700"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                      onClick={() => handleModuleComplete(module.moduleId)}
                      disabled={isCompleted}
                    >
                      {isCompleted ? "Completed ✓" : "Mark Complete"}
                    </Button>
                  </div>

                  <div
                    className="prose prose-sm sm:prose-base max-w-full break-words whitespace-pre-wrap text-gray-700 [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-900 [&_pre]:p-4 [&_pre]:text-white"
                    dangerouslySetInnerHTML={{ __html: module.content }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
