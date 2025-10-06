import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">VocaLearn</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
          >
            <Link href={"login"}>Login</Link>
          </Button>
          <Button className="bg-gray-800 text-white hover:bg-gray-900">
            <Link href={"signup"}>SignUp</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-5xl leading-tight font-bold text-gray-900">
              Master New Skills with{" "}
              <span className="text-blue-600">VocaLearn</span>
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              Transform your learning journey with our comprehensive learning
              management system. Access courses, track progress, and achieve
              your goals faster than ever.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/undraw_knowledge.svg"
              alt="Learning illustration"
              width={500}
              height={400}
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Why Choose VocaLearn Section */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Why Choose VocaLearn?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-gray-600">
            Our platform combines cutting-edge technology with proven learning
            methodologies
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 bg-gray-200 p-8">
              <CardContent className="space-y-4 p-0 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded bg-gray-300">
                  <BookOpen className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Interactive Courses
                </h3>
                <p className="text-gray-600">
                  Engage with dynamic content, quizzes, and hands-on exercises
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gray-200 p-8">
              <CardContent className="space-y-4 p-0 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded bg-gray-300">
                  <Users className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Expert Instructors
                </h3>
                <p className="text-gray-600">
                  Learn from industry professionals with years of experience
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gray-200 p-8">
              <CardContent className="space-y-4 p-0 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded bg-gray-300">
                  <Award className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Certified Learning
                </h3>
                <p className="text-gray-600">
                  Earn recognized certificates upon course completion
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Ready to Start Learning?
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-300">
            Join thousands of learners who have transformed their careers with
            VocaLearn. Start your journey today with our free trial.
          </p>
          <Button className="bg-orange-500 px-8 py-3 text-lg text-white hover:bg-orange-600">
            <Link href={"/signup"}>Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  VocaLearn
                </span>
              </div>
              <p className="text-gray-600">
                Empowering learners worldwide with comprehensive educational
                solutions.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-gray-900">Platform</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href={"/dashboard"}>Courses</Link>
                </li>
                <li>
                  <Link href={"/dashboard/assignments"}>Assignments</Link>
                </li>
                <li>
                  <Link href={"/dashboard/chat"}>Chat</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-gray-900">User</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href={"/login"}>Login</Link>
                </li>
                <li>
                  <Link href={"/dashboard"}>Dashboard</Link>
                </li>
                <li>
                  <Link href={"/signup"}>SignUp</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-gray-600">
            © 2025 VocaLearn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
