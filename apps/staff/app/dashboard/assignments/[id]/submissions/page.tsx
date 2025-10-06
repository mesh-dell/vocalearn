"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { assignmentsSubmissionsGetAPI } from "@/Services/AssignmentService";
import { Submission } from "@/Models/Assignment";

export default function ViewSubmissionsPage() {
  const { id } = useParams();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        if (!id) return;
        const data = await assignmentsSubmissionsGetAPI(Number(id));
        if (data) setSubmissions(data);
      } catch (error) {
        console.error("❌ Failed to fetch submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Loading submissions...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Assignment {id} Submissions
        </h1>
        <Link href="/dashboard/assignments">
          <Button variant="outline" className="hover:bg-orange-100">
            ← Back to Dashboard
          </Button>
        </Link>
      </div>

      {submissions.length === 0 ? (
        <p className="text-gray-500">
          No submissions found for this assignment.
        </p>
      ) : (
        <div className="space-y-6">
          {submissions.map((submission) => (
            <Card key={submission.submissionId}>
              <CardContent className="space-y-4 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Admission ID</p>
                    <p className="font-medium">
                      {submission.studentAdmissionId}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Class</p>
                    <p className="font-medium">{submission.className}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Submission Status</p>
                    <p
                      className={`font-medium ${
                        submission.submissionStatus === "UNGRADED"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {submission.submissionStatus}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Submitted On</p>
                    <p className="font-medium">
                      {new Date(submission.submissionDate).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Answers</h2>
                  <div className="space-y-3">
                    {submission.answers.map((answer) => (
                      <div
                        key={answer.questionId}
                        className="rounded-lg border p-3 bg-gray-50"
                      >
                        <p className="text-sm text-gray-500">
                          Question {answer.questionId}
                        </p>
                        <p className="font-medium">{answer.answerText}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-orange-500 text-white hover:bg-orange-600">
                    Grade Submission
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
