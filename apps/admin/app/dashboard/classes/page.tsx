"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddClassPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    className: "",
    department: "",
    year: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/classes", form); // replace with your backend endpoint
      alert("Class added successfully!");
      router.push("/dashboard/admin");
    } catch (err) {
      console.error(err);
      alert("Failed to add class");
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Add New Class</h1>

      <Card className="max-w-lg mx-auto">
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label>Class Name</label>
              <Input name="className" value={form.className} onChange={handleChange} />
            </div>
            <div>
              <label>Department</label>
              <Input name="department" value={form.department} onChange={handleChange} />
            </div>
            <div>
              <label>Year</label>
              <Input name="year" value={form.year} onChange={handleChange} />
            </div>
            <Button className="bg-orange-500 text-white w-full hover:bg-orange-600">
              Add Class
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
