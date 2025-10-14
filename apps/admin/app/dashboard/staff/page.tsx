"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, PlusCircle, ArrowLeft } from "lucide-react";
import { StaffGet } from "@/Models/Staff";
import { fetchStaffAPI } from "@/Services/AdminService";
import { useRouter } from "next/navigation";

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<StaffGet[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const router = useRouter();

  // ✅ Load staff once
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchStaffAPI();
        setStaff(data);
      } catch (err) {
        console.error("Failed to load staff", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Pagination
  const totalPages = Math.ceil(staff.length / pageSize);
  const paginatedStaff = staff.slice((page - 1) * pageSize, page * pageSize);

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-600">
        <Loader2 className="animate-spin mr-2" /> Loading staff...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-1"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          <h1 className="text-3xl font-bold">All Staff</h1>
        </div>

        <Button
          onClick={() => router.push("/dashboard/staff/create")}
          className="flex items-center gap-2 bg-orange-500 text-white hover:bg-orange-600"
        >
          <PlusCircle size={18} />
          Add Staff
        </Button>
      </div>

      {/* Staff list */}
      {staff.length === 0 ? (
        <p className="text-gray-600">No staff found.</p>
      ) : (
        <Card>
          <CardContent className="p-0">
            <ScrollArea className="h-[70vh]">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Admission Year
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedStaff.map((member) => (
                    <tr key={member.staffId || member.email}>
                      <td className="px-6 py-3">
                        {member.firstName} {member.lastName}
                      </td>
                      <td className="px-6 py-3">{member.email}</td>
                      <td className="px-6 py-3">{member.department}</td>
                      <td className="px-6 py-3">{member.phoneNumber}</td>
                      <td className="px-6 py-3">{member.gender}</td>
                      <td className="px-6 py-3">{member.admissionYear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </CardContent>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4 border-t">
            <Button
              onClick={prevPage}
              disabled={page === 1}
              variant="outline"
              className="text-sm"
            >
              Previous
            </Button>

            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>

            <Button
              onClick={nextPage}
              disabled={page === totalPages}
              variant="outline"
              className="text-sm"
            >
              Next
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
