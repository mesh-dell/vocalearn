"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/Context/useAuth";
import { useEffect, useState } from "react";
import { StaffGetAPI } from "@/Services/StaffService";
import { Staff } from "@/Models/Staff";

export default function ChatPage() {
  const { isLoggedIn } = useAuth();
  const isAuthenticated = isLoggedIn();
  const [staff, setStaff] = useState<Staff[]>([]);

  useEffect(() => {
    const fetchStaff = async () => {
      const response = await StaffGetAPI();
      if (response?.data) {
        setStaff(response.data);
      }
    };

    if (isAuthenticated) {
      fetchStaff();
    }
  }, [isAuthenticated]);

  return (
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
          {staff.map((staff) => (
            <Card key={staff.staffId} className="bg-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {staff.firstName} {staff.lastName}
                    </h3>
                    <p className="text-gray-600">{staff.department}</p>
                  </div>
                  <Link
                    href={`/dashboard/chat/${encodeURIComponent(
                      staff.email
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

