"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/Context/useAuth";
import { useEffect, useState } from "react";
import { StudentGetAPI } from "@/Services/StudentService";
import { Student } from "@/Models/Student";

export default function ChatPage() {
  const { isLoggedIn } = useAuth();
  const isAuthenticated = isLoggedIn();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await StudentGetAPI();
      if (response?.data) {
        setStudents(response.data);
      }
    };

    if (isAuthenticated) {
      fetchStudents();
    }
  }, [isAuthenticated]);

  return (
    <div className="space-y-8 container mx-auto px-6 py-10 ">
      {/* Header Section */}
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Chat</h1>
        <p className="text-gray-600">Start a private chat with your students</p>
      </div>

      {/* Students Section */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Students</h2>

        <div className="space-y-4">
          {students.map((student) => (
            <Card key={student.admissionId} className="bg-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {student.admissionId} {student.email}
                    </h3>
                    <p className="text-gray-600">{student.className}</p>
                  </div>
                  <Link
                    href={`/dashboard/chat/${encodeURIComponent(
                      student.email
                    )}`}
                  >
                    <Button className="bg-orange-500 px-6 text-white hover:bg-orange-600">
                      Chat
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
