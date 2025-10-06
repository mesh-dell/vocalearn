"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { assignmentsGetAPI } from "@/Services/AssignmentService"; // 🔹 Replace with your real API
import { Assignment } from "@/Models/Assignment"; // 🔹 Assignment model
import { useAuth } from "@/Context/useAuth";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.staffId) return;
    const fetchAssignments = async () => {
      try {
        const response = await assignmentsGetAPI(user?.staffId);
        if (response) {
          setAssignments(response);
        }
      } catch (err) {
        console.error("Error fetching assignments:", err);
      }
    };

    fetchAssignments();
  }, [user?.staffId]);

  return (
    <div className="space-y-8 container mx-auto px-6 py-10 ">
      {/* Header */}
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Assignments</h1>
        <p className="text-gray-600">
          Manage assignments and view student submissions.
        </p>
      </div>

      {/* Assignments List */}
      {assignments.length === 0 ? (
        <p className="text-gray-600">No assignments created yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => (
            <Card
              key={assignment.assignmentId}
              className="border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <CardContent className="flex flex-col justify-between p-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {assignment.title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    {assignment.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Due:{" "}
                    <span className="font-medium">
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-2">
                  <Link
                    href={`/dashboard/assignments/${assignment.assignmentId}/submissions`}
                  >
                    <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
                      View Submissions
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Assignment CTA */}
      <div>
        <Link href="/dashboard/assignments/create">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            + Create New Assignment
          </Button>
        </Link>
      </div>
    </div>
  );
}
