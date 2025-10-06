"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StaffGet, StaffPost } from "@/Models/Staff";
import { addStaffAPI, fetchStaffAPI } from "@/Services/AdminService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const staffSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  department: z.string().min(2),
  gender: z.enum(["Male", "Female"]),
  phoneNumber: z.string().min(10),
  birthYear: z.number().min(1950).max(new Date().getFullYear()),
  admissionYear: z.number().min(2000).max(new Date().getFullYear()),
});

type StaffForm = z.infer<typeof staffSchema>;

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<StaffGet[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StaffForm>({
    resolver: zodResolver(staffSchema),
  });

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
  }, [staff]);

  const handleAddStaff = async (data: StaffForm) => {
    try {
      setCreating(true);
      const newStaff = await addStaffAPI(data);
      setStaff((prev) => [...prev, newStaff]);
      reset();
      toast.success("Staff added successfully!");
      router.push("/dashboard/staff");
    } catch (err) {
      console.error("Error adding staff", err);
      toast.error("Failed to add staff");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-600">
        <Loader2 className="animate-spin mr-2" /> Loading staff...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">All Staff</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-orange-500 text-white hover:bg-orange-600">
              <PlusCircle size={18} />
              Add Staff
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(handleAddStaff)}
              className="space-y-4 mt-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label>First Name</label>
                  <Input {...register("firstName")} />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label>Last Name</label>
                  <Input {...register("lastName")} />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label>Email</label>
                <Input {...register("email")} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label>Department</label>
                  <Input {...register("department")} />
                </div>
                <div>
                  <label>Gender</label>
                  <select
                    {...register("gender")}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label>Phone Number</label>
                <Input {...register("phoneNumber")} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label>Birth Year</label>
                  <Input
                    type="number"
                    {...register("birthYear", { valueAsNumber: true })}
                  />
                </div>
                <div>
                  <label>Admission Year</label>
                  <Input
                    type="number"
                    {...register("admissionYear", { valueAsNumber: true })}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={creating}
                className="bg-orange-500 text-white w-full hover:bg-orange-600"
              >
                {creating ? "Saving..." : "Add Staff"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Staff Table */}
      {staff.length === 0 ? (
        <p className="text-gray-600">No staff found.</p>
      ) : (
        <Card>
          <CardContent className="p-0">
            <ScrollArea className="h-[70vh]">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
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
                  {staff.map((member) => (
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
        </Card>
      )}
    </div>
  );
}
