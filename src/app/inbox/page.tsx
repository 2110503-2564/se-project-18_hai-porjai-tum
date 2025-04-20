"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import AdminInbox from "@/components/AdminInbox";
import { db } from "@/libs/firebase"; 
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";


type ChatUser = {
  id: string;
  name: string;
  avatar?: string;
};

export default function AdminChatPage() {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chatsMetadata"), (snapshot) => {
      const chatUsers = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: data.chatId,
          name: data.userName,
          avatar: data.avatar,
        };
      });
      setUsers(chatUsers);
    });
  
    return () => unsubscribe();
  }, []);
  

  useEffect(() => {
    if (selectedUser) {
      const q = query(
        collection(db, "chats", selectedUser.id, "messages"),
        orderBy("timestamp")
      );
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs = querySnapshot.docs.map((doc) => doc.data());
        setMessages(msgs);
      });
  
      return () => unsubscribe();
    }
  }, [selectedUser]);
  

  const sendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { sender: "admin", content: message }]);
      setMessage("");
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const openFileExplorer = () => {
    document.getElementById("file-input")?.click();
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Chat Selector */}
      <div className="border-b bg-white p-2">
        <AdminInbox
          users={users}
          onSelect={setSelectedUser}
          selectedUserId={selectedUser?.id ?? null}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Message Column */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <div className="bg-gray-100 p-2 text-sm border-b">
                Chatting with <strong>{selectedUser.name}</strong>
              </div>

              <div className="flex-1 p-4 overflow-y-auto bg-white flex flex-col space-y-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[60%] p-3 rounded-lg ${
                      msg.sender === "admin" ? "bg-blue-600 text-white self-end ml-auto" : "bg-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
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

              {/* Input Area */}
              <div className="p-4 border-t flex items-center gap-3 bg-white mb-12">
                <button className="text-green-500 border p-2 rounded-full hover:bg-green-100" onClick={openFileExplorer}>
                  📎
                </button>
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  accept="image/*"
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
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a user to start chatting
            </div>
          )}
        </div>

        {/* Sidebar - User Info */}
        {selectedUser && (
          <div className="w-[300px] bg-white border-l p-4 flex flex-col">
            <div className="relative">
              <Image
                src={selectedUser.avatar || "/img/user.jpg"}
                alt="User profile"
                width={300}
                height={200}
                className="rounded-xl object-cover"
              />
              <Image
                src="/img/carlogo.png"
                alt="icon"
                width={64}
                height={64}
                className="absolute bottom-0 right-0 rounded-full border-2 border-white shadow-lg"
              />
            </div>
            <h2 className="mt-4 text-xl font-bold">{selectedUser.name}</h2>
            <div className="text-gray-600 mt-2">Role: Customer</div>
            <div className="mt-auto flex justify-between gap-2 pt-4 mb-12">
              <button className="w-1/2 py-2 border rounded-xl hover:bg-gray-100">Delete</button>
              <button className="w-1/2 py-2 border rounded-xl text-red-500 hover:bg-red-50">Report</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
