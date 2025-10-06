// app/dashboard/layout.tsx
"use client";

import { ReactNode } from "react";
import { StaffNav } from "@/components/StaffNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar always visible */}
      <StaffNav />

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
