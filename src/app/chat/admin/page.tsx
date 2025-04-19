'use client';

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io('https://sw2-backend-backup1.onrender.com');

export default function ChatViewPage() {
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);

  useEffect(() => {
    const handleMessage = (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("chat message", handleMessage);
    return () => {
      socket.off("chat message", handleMessage);
    };
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Live Chat View</h2>
      <div className="space-y-2 border rounded-lg p-4 bg-white shadow">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-200 text-left"
            }`}
          >
            <p className="text-sm">{msg.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
