"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinGroupPage() {
  const router = useRouter();
  const [groupId, setGroupId] = useState("");

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupId.trim()) return;
    router.push(`/dashboard/group-chat/${groupId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 text-gray-600">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Join a Group Chat
        </h1>

        <form onSubmit={handleJoin} className="space-y-4">
          <input
            type="number"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            placeholder="Enter Group ID"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Join Group
          </button>
        </form>
      </div>
    </div>
  );
}
