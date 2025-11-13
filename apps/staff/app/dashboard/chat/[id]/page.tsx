"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/Context/useAuth";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
  ChatGetConversationAPI,
  ChatMarkAsReadAPI,
} from "@/Services/ChatService";

interface ChatMessage {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  read?: boolean;
}

export default function ChatConversationPage() {
  const params = useParams();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const stompClientRef = useRef<Client | null>(null);

  // student email from URL
  const studentEmail = decodeURIComponent(params.id as string);

  // Load existing conversation and mark unread as read
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user?.email || !studentEmail) return;
      try {
        const response = await ChatGetConversationAPI(user.email, studentEmail);
        if (response?.data) {
          const fetchedMessages = response.data.map((msg: any) => ({
            id: msg.id,
            sender: msg.sender,
            content: msg.content,
            read: msg.read,
            timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));

          setMessages(fetchedMessages);

          // ✅ Mark all messages from student as read
          const unread = fetchedMessages.filter(
            (msg) => msg.sender === studentEmail && !msg.read
          );

          for (const msg of unread) {
            await ChatMarkAsReadAPI(msg.id);
          }
        }
      } catch (err) {
        console.error("Error loading conversation:", err);
      }
    };

    fetchMessages();
  }, [user?.email, studentEmail]);

  // Setup STOMP WebSocket client
  useEffect(() => {
    if (!user?.email) return;

    const socket = new SockJS("http://localhost:8085/ws");
    const client = new Client({
      webSocketFactory: () => socket as any,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");

      client.subscribe(`/user/${user.email}/private`, async (message) => {
        if (message.body) {
          const msg = JSON.parse(message.body);

          // ✅ If instructor receives a new message, mark it as read immediately
          if (msg.sender === studentEmail) {
            await ChatMarkAsReadAPI(msg.id);
          }

          setMessages((prev) => [
            ...prev,
            {
              id: msg.id,
              sender: msg.sender,
              content: msg.content,
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
        }
      });
    };

    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [user?.email, studentEmail]);

  // Send message
  const handleSendMessage = () => {
    if (!message.trim() || !stompClientRef.current || !user?.email) return;

    const msgPayload = {
      sender: user.email,
      receiver: studentEmail,
      content: message,
    };

    stompClientRef.current.publish({
      destination: "/app/private",
      body: JSON.stringify(msgPayload),
    });

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: user.email,
        content: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMessage("");
  };

  return (
    <div className="mx-auto max-w-4xl text-gray-700">
      {/* Header */}
      <div className="mb-6 flex items-center space-x-4">
        <Link href="/dashboard/chat">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Chat with {studentEmail}
          </h1>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex h-[600px] flex-col">
        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === user?.email ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                    msg.sender === user?.email
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p
                    className={`mt-1 text-xs ${
                      msg.sender === user?.email
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-blue-600 px-4 text-white hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

