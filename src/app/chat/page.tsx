"use client";

import { useState } from "react";

const mockChats = [
  {
    id: 1,
    name: "RX 7 2005",
    lastMessage: "I have a question about engines",
    image: "/img/rx7.jpg",
    date: "15/03/2025",
    carDetail: {
      model: "RX 7 2005",
      owner: "Teno Onet",
      location: "Rayong, Thailand",
      distance: "673km",
      image: "/img/rx7.jpg",
    },
  },
];

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Chat list - ชิดซ้ายสุด */}
      <div className="w-[300px] bg-gray-100 border-r border-gray-300">
        <div className="p-4 text-xl font-bold text-white bg-red-400">My profile</div>
        <div className="flex justify-around bg-white py-2">
          <div className="text-red-600 font-semibold border-b-2 border-red-500">Rental</div>
          <div className="text-gray-500">Admin</div>
        </div>
        {mockChats.map((chat) => (
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

      {/* Message area */}
      <div className="flex-1 flex flex-col relative">
        <div className="bg-gray-100 p-3 text-sm border-b">
          You created rental of <strong>{selectedChat.name}</strong> on {selectedChat.date}
        </div>

        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
          <div className="bg-blue-400 text-white p-3 rounded-lg w-fit">สวัสดีครับ!</div>
          <div className="bg-blue-400 text-white p-3 rounded-lg w-2/3">มีอะไรให้ทางเราช่วยเหลือหรือไม่?</div>
        </div>

        {/* Input + send button */}
        <div className="p-4 border-t flex items-center gap-3 bg-white mb-12">
          <button className="text-green-500 border p-2 rounded-full hover:bg-green-100">📎</button>
          <input
            className="flex-1 border rounded-full px-4 py-2 outline-none"
            placeholder="Type a message"
          />
          <button className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-full font-semibold">
            SEND
          </button>
        </div>
      </div>

      {/* Car detail area */}
      <div className="w-[300px] bg-white border-l p-4 flex flex-col">
        <img src={selectedChat.carDetail.image} alt="car" className="rounded-xl" />
        <h2 className="mt-4 text-xl font-bold">{selectedChat.carDetail.model}</h2>
        <div className="text-gray-600 flex items-center gap-2 mt-2">
          👤 {selectedChat.carDetail.owner}
        </div>
        <div className="text-gray-600 flex items-center gap-2">
          📍 {selectedChat.carDetail.distance} away, {selectedChat.carDetail.location}
        </div>

        {/* ปุ่มล่าง ยกขึ้นเล็กน้อย */}
        <div className="mt-auto flex justify-between gap-2 pt-4 mb-12">
          <button className="w-1/2 py-2 border rounded-xl hover:bg-gray-100">Cancel</button>
          <button className="w-1/2 py-2 border rounded-xl text-red-500 hover:bg-red-50">Report</button>
        </div>
      </div>
    </div>
  );
}
