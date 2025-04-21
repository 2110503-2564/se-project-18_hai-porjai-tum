"use client"; // Ensure you're using client-side rendering here
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation"; // Import useParams from next/navigation
import Image from "next/image";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "@/libs/firebase";

export default function AdminChatPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState(""); 
  const { adminId } = useParams(); // Use useParams instead of useRouter

  if (!session) return;

  // Fetching messages for the specific admin chat
  useEffect(() => {
    if (!session?.user || !adminId) return;

    const chatId = `${session.user._id}_${adminId}`; // Unique chat ID using user ID and admin ID
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe(); // Clean up on unmount
  }, [session?.user, adminId]);

  // Handle sending message
  const sendMessage = async () => {
    if (message.trim() && session?.user && adminId) {
      const chatId = `${session.user._id}_${adminId}`; // Ensure the chat ID is correct
      await addDoc(collection(db, "chats", chatId, "messages"), {
        sender: "admin",
        content: message,
        timestamp: serverTimestamp(),
        adminId,
        userName: session.user.name,
      });

      setMessage(""); // Clear the input field
    }
  };

  return (
    <div className="flex h-[100%] overflow-hidden">
      <div className="flex-1 flex flex-col relative">
        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
          {messages.map((msg, index) => {
            const isAdmin = msg.sender !== "user";

            return (
              <div
                key={index}
                className={`flex items-end gap-2 mb-2 ${
                  isAdmin ? "justify-end" : "justify-start"
                }`}
              >
                {/* User Avatar on LEFT, Admin Avatar on RIGHT */}
                {!isAdmin && (
                  <div className="w-8 h-8 relative order-none">
                    <Image
                      src="/img/max.jpg"
                      alt="User Avatar"
                      fill
                      className="rounded-full object-cover border border-white"
                    />
                  </div>
                )}

                {/* Message bubble */}
                <div
                  className={`p-3 rounded-lg w-fit max-w-[70%] ${
                    isAdmin ? "bg-orange-400 text-white" : "bg-blue-300 text-white"
                  }`}
                >
                  <div>{msg.content}</div>
                </div>

                {isAdmin && (
                  <div className="w-8 h-8 relative order-none">
                    <Image
                      src="/img/popop2.jpeg"
                      alt="Admin Avatar"
                      fill
                      className="rounded-full object-cover border border-white"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input + send button */}
        <div className="p-4 border-t flex items-center gap-3 bg-white mb-12">
          <button className="text-green-500 border p-2 rounded-full hover:bg-green-100">📎</button>
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
      </div>
    </div>
  );
}
