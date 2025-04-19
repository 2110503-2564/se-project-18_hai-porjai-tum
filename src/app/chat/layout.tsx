"use client";
import { useState } from "react";
import ChatSelecter from "@/components/ChatSelecter"; // Adjust path according to your file structure

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const [selectedChat, setSelectedChat] = useState<any>(null); // Track the selected chat
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar with ChatSelecter */}
      <div className="w-[25vw] border border-silver overflow-y-auto">
        <ChatSelecter setSelectedChat={setSelectedChat} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4">
        {children} {/* Render the content passed to this layout */}
      </div>
    </div>
  );
}
