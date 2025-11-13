"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/Context/useAuth";
import { useEffect, useState } from "react";
import { StaffGetAPI } from "@/Services/StaffService";
import { ChatGetConversationAPI } from "@/Services/ChatService";
import { ChatMessage } from "@/Models/ChatMessage";
import { Staff } from "@/Models/Staff";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";

export default function ChatPage() {
  const { user, isLoggedIn } = useAuth();
  const isAuthenticated = isLoggedIn();

  const [staff, setStaff] = useState<Staff[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffAndUnreadCounts = async () => {
      if (!isAuthenticated || !user) return;

      try {
        const response = await StaffGetAPI();
        if (response?.data) {
          setStaff(response.data);

          // Fetch unread counts for each staff concurrently
          const counts: Record<string, number> = {};
          await Promise.all(
            response.data.map(async (instructor: Staff) => {
              const messages = await ChatGetConversationAPI(
                user.email,
                instructor.email,
              );
              if (messages) {
                const unread = messages.data.filter(
                  (msg: ChatMessage) =>
                    msg.receiver === user.email && !msg.read,
                ).length;
                counts[instructor.email] = unread;
              } else {
                counts[instructor.email] = 0;
              }
            }),
          );

          setUnreadCounts(counts);
        }
      } catch (error) {
        console.error("Failed to load instructors or messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffAndUnreadCounts();
  }, [isAuthenticated, user]);

  if (!isAuthenticated || !user) {
    return (
      <main className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
        <p className="mt-4 text-gray-600">
          Please{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            log in
          </Link>{" "}
          to access chat.
        </p>
      </main>
    );
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Chat</h1>
          <p className="text-gray-600">
            Communicate and ask questions to your instructors
          </p>
        </div>

        {/* Instructors Section */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Instructors</h2>

          <div className="space-y-4">
            {staff.map((instructor) => {
              const unread = unreadCounts[instructor.email] || 0;

              return (
                <Card key={instructor.staffId} className="bg-gray-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                          {instructor.firstName} {instructor.lastName}
                          {unread > 0 && (
                            <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
                              {unread}
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600">{instructor.department}</p>
                      </div>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={`/dashboard/chat/${encodeURIComponent(
                              instructor.email,
                            )}`}
                          >
                            <Button className="bg-orange-500 px-6 text-white hover:bg-orange-600">
                              Chat
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          {unread > 0
                            ? `${unread} unread message${unread > 1 ? "s" : ""}`
                            : "No unread messages"}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
