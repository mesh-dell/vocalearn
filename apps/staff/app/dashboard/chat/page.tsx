"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/Context/useAuth";
import { useEffect, useState } from "react";
import { StudentGetAPI } from "@/Services/StudentService";
import { Student } from "@/Models/Student";
import { ChatGetConversationAPI } from "@/Services/ChatService";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function ChatPage() {
  const { isLoggedIn, user } = useAuth();
  const isAuthenticated = isLoggedIn();
  const [students, setStudents] = useState<Student[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

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

  useEffect(() => {
    const fetchUnreadCounts = async () => {
      if (!user?.email) return;

      const counts: Record<string, number> = {};
      for (const student of students) {
        const res = await ChatGetConversationAPI(user.email, student.email);
        if (res?.data) {
          const unread = res.data.filter(
            (msg) => msg.sender === student.email && msg.read === false
          ).length;
          counts[student.email] = unread;
        }
      }
      setUnreadCounts(counts);
    };

    if (students.length > 0) fetchUnreadCounts();
  }, [students, user?.email]);

  return (
    <div className="space-y-8 container mx-auto px-6 py-10">
      {/* Header Section */}
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Chat</h1>
        <p className="text-gray-600">
          Start or continue conversations with your students
        </p>
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
                      {student.email}
                    </h3>
                    <p className="text-gray-600">{student.className}</p>
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={`/dashboard/chat/${encodeURIComponent(
                            student.email
                          )}`}
                        >
                          <Button className="bg-orange-500 px-6 text-white hover:bg-orange-600 relative">
                            Chat
                            {unreadCounts[student.email] > 0 && (
                              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                                {unreadCounts[student.email]}
                              </span>
                            )}
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      {unreadCounts[student.email] > 0 && (
                        <TooltipContent>
                          {unreadCounts[student.email]} unread message
                          {unreadCounts[student.email] > 1 ? "s" : ""}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
