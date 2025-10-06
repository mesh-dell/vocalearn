import type React from "react";
import { DashboardNav } from "@/components/ui/dashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
