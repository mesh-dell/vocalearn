"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, ClipboardCheck } from "lucide-react";

export default function StaffLandingPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-600">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              VocaLearn
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/login" className="text-gray-700 hover:text-indigo-600">
              Login
            </Link>
            <Link
              href="/register"
              className="text-gray-700 hover:text-indigo-600"
            >
              Register
            </Link>
            <Link href="/dashboard">
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                Dashboard
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Empower Your Teaching with VocaLearn
          </h1>
          <p className="mt-6 text-lg text-indigo-100 max-w-2xl mx-auto">
            Build engaging courses, manage assignments, and collaborate with
            your students — all in one platform designed for instructors.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/register">
              <Button className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-3">
                Join as Instructor
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-indigo-700"
              >
                Instructor Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-12">
          Everything You Need as an Instructor
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow hover:shadow-lg transition">
            <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Create Courses</h3>
            <p className="text-gray-600">
              Build structured modules with rich content using our integrated
              editor and multimedia support.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow hover:shadow-lg transition">
            <ClipboardCheck className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Manage Assignments</h3>
            <p className="text-gray-600">
              Post assignments, review student submissions, and provide timely
              feedback effortlessly.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow hover:shadow-lg transition">
            <Users className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Connect with Students</h3>
            <p className="text-gray-600">
              Engage with learners directly via chat and collaboration tools to
              boost student success.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Teaching?</h2>
        <p className="mb-8 text-indigo-100">
          Sign up today and get access to all the tools you need to inspire and
          guide your students.
        </p>
        <Link href="/dashboard">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
            Go to Dashboard
          </Button>
        </Link>
      </section>
    </main>
  );
}

