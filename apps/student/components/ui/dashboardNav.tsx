"use client";

import Link from "next/link";
import { BookOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardNav() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              VocaLearn
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <Link
              href="/dashboard"
              className="font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              My Courses
            </Link>
            <Link
              href="/dashboard/assignments"
              className="font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Assignments
            </Link>
            <Link
              href="/dashboard/chat"
              className="font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Chat
            </Link>
            <Link
              href="/dashboard/group-chat"
              className="font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Group Chat
            </Link>
          </nav>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-4 md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-gray-100 hover:bg-gray-200"
                >
                  <Menu className="h-5 w-5 text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white text-gray-700"
              >
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">My Courses</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/assignments">Assignments</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/chat">Chat</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/group-chat">Group Chat</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Button (hidden on md and up, since nav shows it) */}
            <Button className="bg-gray-700 px-4 text-white hover:bg-gray-800">
              Profile
            </Button>
          </div>

          {/* Profile Button (desktop only) */}
          <div className="hidden md:block">
            <Button className="bg-gray-700 px-6 text-white hover:bg-gray-800">
              <Link href={"/dashboard/profile"}>Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
