"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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
import getRental from "@/libs/getRental";

export default function ChatRentalPage({ params }: { params: { rid: string } }) {
  const [selectedChat, setSelectedChat] = useState<RentalJson1 | null>(null);
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]); // For storing chat messages
  const [message, setMessage] = useState(""); // For handling input message

  if (!session) return;

  // Fetching rental data
  useEffect(() => {
    const getData = async () => {
      const res = await getRental(params.rid, session.user.token);
      const json = await res;
      setSelectedChat(json);
    };
    getData();
  }, [params.rid, session?.user.token]);

  // Fetching messages for the specific rental (chat) ID
  useEffect(() => {
    if (!session?.user) return;

    const chatId = `${session.user._id}_${params.rid}`; // Unique chat ID
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe(); // Clean up on unmount
  }, [session?.user, params.rid]);

  // Handle sending message
  const sendMessage = async () => {
    if (message.trim() && session?.user) {
      const chatId = `${session.user._id}_${params.rid}`; // Ensure the chat ID is correct
      await addDoc(collection(db, "chats", chatId, "messages"), {
        sender: "user",
        content: message,
        timestamp: serverTimestamp(),
        rentalId: params.rid,
      
        userName: session.user.name,
      });
      
      setMessage(""); // Clear the input field
    }
  };
  // const formatTimestamp = (timestamp: any) => {
  //   const date = timestamp.toDate();
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();
  //   return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`; // Format as HH:MM
  // };

  return (
    <div>
      {!selectedChat ? (
        <p>Loading...</p>
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* Message area */}
          <div className="flex-1 flex flex-col relative">
            <div className="bg-gray-100 p-2 text-sm border-b">
              You created rental of <strong>{selectedChat.data.car?.name}</strong> on {selectedChat.data.pickupDate}
            </div>

            {/* Chat messages */}
<div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`p-3 rounded-lg ${msg.sender === "user" ? "bg-blue-400 text-white" : "bg-gray-200"}`}
    >
      {/* Display message content */}
      <div>{msg.content}</div>
      
      {/* Display formatted timestamp outside the blue bubble */}
      {/* <div className="text-xs text-gray-500 mt-1">{formatTimestamp(msg.timestamp)}</div> */}
    </div>
  ))}
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

          {/* Car detail area */}
          {selectedChat && (
            <div className="w-[300px] bg-white border-l p-4 flex flex-col">
              <Image
                src={selectedChat.data.car ? selectedChat.data.car.picture : "/img/Profile.png"}
                width={200}
                height={0}
                alt="car"
                className="object-none rounded-xl w-[30vw] h-[30vh]"
              />
              <h2 className="mt-4 text-xl font-bold">{selectedChat.data.car?.model}</h2>

              {/* Buttons */}
              <div className="mt-auto flex justify-between gap-2 pt-4 mb-12">
                <button className="w-1/2 py-2 border rounded-xl hover:bg-gray-100">Cancel</button>
                <button className="w-1/2 py-2 border rounded-xl text-red-500 hover:bg-red-50">Report</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
