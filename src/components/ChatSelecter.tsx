"use client";
import { useState } from "react";

export default function ChatSelecter({ setSelectedChat }: { setSelectedChat: (chat: any) => void }) {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "RX 7 2005",
      lastMessage: "I have a question about engines",
      image: "/img/Profile.png",
      date: "15/03/2025",
      carDetail: {
        model: "RX 7 2005",
        owner: "Teno Onet",
        location: "Rayong, Thailand",
        distance: "673km",
        image: "/img/Profile.png",
      },
    },
   
  ]);
  
  const [selectedTab, setSelectedTab] = useState<"rental" | "admin">("rental"); // Track selected tab

  const handleTabChange = (tab: "rental" | "admin") => {
    setSelectedTab(tab); // Update the selected tab state
  };

  return (
    <div className="w-[25vw] h-[100vh] border border-silver overflow-y-auto">
      <div className="p-4 text-xl font-bold text-white bg-red-400">My Profile</div>

      {/* Tabs to toggle between Rental and Admin */}
      <div className="flex justify-around bg-white py-2">
        <div
          className={`cursor-pointer text-base font-semibold ${selectedTab === "rental" ? "text-red-600 border-b-2 border-red-500" : "text-gray-600"}`}
          onClick={() => handleTabChange("rental")}
        >
          Rental
        </div>
        <div
          className={`cursor-pointer text-base font-semibold ${selectedTab === "admin" ? "text-red-600 border-b-2 border-red-500" : "text-gray-600"}`}
          onClick={() => handleTabChange("admin")}
        >
          Admin
        </div>
      </div>

      {/* Display chats based on the selected tab */}
      {selectedTab === "rental" ? (
        <div>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className="flex items-center gap-3 p-4 hover:bg-gray-200 cursor-pointer border-b"
            >
              <img src={chat.image} className="w-12 h-12 rounded-full" />
              <div>
                <div className="font-semibold">{chat.name}</div>
                <div className="text-sm text-gray-600">{chat.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4">
          <p className="font-semibold">Admin section content will go here...</p>
          {/* You can add additional admin-specific content here */}
        </div>
      )}
    </div>
  );
}
