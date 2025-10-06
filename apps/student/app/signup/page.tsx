"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/Context/useAuth";

// ✅ Signup validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  admissionYear: yup
    .string()
    .matches(/^\d{4}$/, "Enter a valid year (e.g. 2024)")
    .required("Admission year is required"),
  admissionId: yup.string().required("Admission ID is required"),
  courseName: yup.string().required("Course name is required"),
  gender: yup.string().required("Gender is required"),
  password: yup.string().min(6, "Password must be at least 6 chars").required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

type SignUpFormInputs = yup.InferType<typeof schema>;

export default function SignUpPage() {
  const { registerUser } = useAuth(); // 👈 from your context
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(schema),
  });

  const handleSignUp = (form: SignUpFormInputs) => {
    registerUser(
      form.email,
      form.admissionYear,
      form.admissionId,
      form.courseName,
      form.gender,
      form.password,
      form.confirmPassword,
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 text-gray-700">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-600">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-semibold text-gray-900">
              VocaLearn
            </span>
          </Link>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Create Account
          </h1>
          <p className="text-gray-600">
            Join VocaLearn and start your learning journey
          </p>
        </div>

        {/* Signup Form */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-center text-xl text-gray-900">
              Sign Up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Admission Year (as input) */}
              <div className="space-y-2">
                <Label>Admission Year</Label>
                <Input
                  type="text"
                  placeholder="e.g., 2024"
                  {...register("admissionYear")}
                />
                {errors.admissionYear && (
                  <p className="text-sm text-red-500">
                    {errors.admissionYear.message}
                  </p>
                )}
              </div>

              {/* Admission ID */}
              <div className="space-y-2">
                <Label>Admission ID</Label>
                <Input
                  placeholder="TVET/CS2022/0909"
                  {...register("admissionId")}
                />
                {errors.admissionId && (
                  <p className="text-sm text-red-500">
                    {errors.admissionId.message}
                  </p>
                )}
              </div>

              {/* Course Name */}
              <div className="space-y-2">
                <Label>Course Name</Label>
                <Input
                  placeholder="Computer Science"
                  {...register("courseName")}
                />
                {errors.courseName && (
                  <p className="text-sm text-red-500">
                    {errors.courseName.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label>Gender</Label>
                <Input
                  placeholder="Male/Female/Other"
                  {...register("gender")}
                />
                {errors.gender && (
                  <p className="text-sm text-red-500">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Create a strong password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="mt-6 w-full bg-blue-600 py-2.5 text-white hover:bg-blue-700"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
