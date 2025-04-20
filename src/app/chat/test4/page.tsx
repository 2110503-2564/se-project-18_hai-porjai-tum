"use client";
import { useState } from "react";
import ChatLayout from "@/app/chat/layout"; // Assuming the layout is located here

export default function ChatRentalPage() {
  const [selectedChat, setSelectedChat] = useState<any>(null); // Default value is null
  const [message, setMessage] = useState(""); // For handling input message
  const [messages, setMessages] = useState<any[]>([]); // For storing chat messages
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to store selected file

  const [chats, setChats] = useState({
    id: 1,
    name: "Orwauy",
    lastMessage: "I have a question about engines",
    image: "/img/popop2.jpeg",
    date: "Today",
    carDetail: {
      model: "Porjai",
      owner: "PJ ",
      location: "BangRak, Thailand",
      distance: "3 km",
      image: "/img/popop2.jpeg",
      profileImage: "/img/carlogo.png", // Profile image
    },
  });

  // Handle sending message
  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", content: message },
      ]);
      setMessage(""); // Reset input field
    }
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Store the selected file
      console.log("Selected file:", file);
    }
  };

  // Trigger file input click
  const openFileExplorer = () => {
    document.getElementById("file-input")?.click();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col relative">
        {chats ? (
          <>
            <div className="bg-gray-100 p-2 text-sm border-b">
              You matched with <strong>{chats.name}</strong> on {chats.date}
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-white flex flex-col space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    msg.sender === "user" ? "bg-blue-400 text-white self-end" : "bg-gray-200"
                  }`}
                  style={{ wordWrap: "break-word" }}
                >
                  {msg.content}
                </div>
              ))}

              {/* Display selected file (optional) */}
              {selectedFile && (
                <div className="p-3 rounded-lg bg-gray-100 mt-4">
                  <p>Selected File: {selectedFile.name}</p>
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected file"
                    className="max-w-[200px] max-h-[200px] mt-2 rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Input + send button */}
            <div className="p-4 border-t flex items-center gap-3 bg-white mb-12">
              <button
                className="text-green-500 border p-2 rounded-full hover:bg-green-100"
                onClick={openFileExplorer}
              >
                📎
              </button>

              {/* Hidden file input */}
              <input
                id="file-input"
                type="file"
                className="hidden"
                accept="image/*" // Allow image files only
                onChange={handleFileSelect}
              />

              <input
                className="flex-1 border rounded-full px-4 py-2 outline-none"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-full font-semibold"
                onClick={sendMessage}
              >
                SEND
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full text-lg">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>

      {/* Car detail area */}
      {chats && (
        <div className="w-[300px] bg-white border-l p-4 flex flex-col">
          {/* Car Image Container */}
          <div className="relative">
            <img src={chats.carDetail.image} alt="car" className="rounded-xl" />
            
            {/* Profile Image */}
            <img
              src={chats.carDetail.profileImage}
              alt="profile"
              className="absolute bottom-0 right-0 w-16 h-16 rounded-full border-2 border-white shadow-lg"
            />
          </div>

          <h2 className="mt-4 text-xl font-bold">{chats.carDetail.model}</h2>
          <div className="text-gray-600 flex items-center gap-2 mt-2">
            👤 {chats.carDetail.owner}
          </div>
          <div className="text-gray-600 flex items-center gap-2">
            📍 {chats.carDetail.distance} away, {chats.carDetail.location}
          </div>

          {/* Buttons */}
          <div className="mt-auto flex justify-between gap-2 pt-4 mb-12">
            <button className="w-1/2 py-2 border rounded-xl hover:bg-gray-100">Cancel</button>
            <button className="w-1/2 py-2 border rounded-xl text-red-500 hover:bg-red-50">Report</button>
          </div>
        </div>
      )}
    </div>
  );
}
