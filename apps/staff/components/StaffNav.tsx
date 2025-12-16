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
import { useAuth } from "@/Context/useAuth";

export function StaffNav() {
  const {logout} = useAuth()
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
              VocaLearn Staff
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center space-x-8 md:flex">
            <Link href="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/dashboard/courses" className="hover:text-blue-600">
              Courses
            </Link>
            <Link href="/dashboard/assignments" className="hover:text-blue-600">
              Assignments
            </Link>
            <Link href="/dashboard/chat" className="hover:text-blue-600">
              Chat
            </Link>
           <Button onClick={logout}>Log Out</Button> 
          </nav>

          {/* Mobile Nav */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5 text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-white text-gray-700"
            >
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/courses">Courses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/assignments">Assignments</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/chat">Chat</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
