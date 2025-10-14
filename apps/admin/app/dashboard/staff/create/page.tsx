"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { addStaffAPI } from "@/Services/AdminService";
import { useState } from "react";

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

export default function CreateStaffPage() {
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StaffForm>({
    resolver: zodResolver(staffSchema),
  });

  const handleAddStaff = async (data: StaffForm) => {
    try {
      setCreating(true);
      await addStaffAPI(data);
      toast.success("Staff added successfully!");
      reset();
      router.push("/dashboard/staff");
    } catch (err) {
      console.error("Error adding staff", err);
      toast.error("Failed to add staff");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Add New Staff Member</h1>

      <form onSubmit={handleSubmit(handleAddStaff)} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <Input {...register("firstName")} />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label>Last Name</label>
            <Input {...register("lastName")} />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
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

        <div className="flex gap-4 flex-col">
          <Button
            type="submit"
            disabled={creating}
            className="bg-orange-500 text-white w-full hover:bg-orange-600"
          >
            {creating ? "Saving..." : "Add Staff"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/staff")}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
