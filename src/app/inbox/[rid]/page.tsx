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
        sender: "admin",
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
        <div className="flex h-[84vh] overflow-hidden">
          {/* Message area */}
          <div className="flex-1 flex flex-col relative">
            <div className="bg-gray-100 p-2 text-sm border-b">
               <strong>{selectedChat.data.user?.name}</strong> create this on {selectedChat.data.pickupDate}
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
  {messages.map((msg, index) => {
    const isAdmin = msg.sender === "admin";

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
              src={ "/img/user.jpg"}
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
              src={"/img/popop2.jpeg"}
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
               <h2 className="mt-4 text-xl font-bold">{selectedChat.data.user?.name}</h2>
          <div className="text-gray-600 flex items-center gap-2 mt-2">
            👤 {selectedChat.data.user?.name}
          </div>
          <div className="text-gray-600 flex items-center gap-2">
            📍 {selectedChat.data.pickupLocation} away, {selectedChat.data.assumePrice}
          </div>
          <div className="text-gray-600 flex items-center gap-2">
             {selectedChat.data.pickupDate} to  {selectedChat.data.returnDate}
          </div>



              {/* Buttons */}
              <div className="mt-auto flex justify-between gap-2 pt-4 mb-12">
                <button className="w-1/2 py-2 border rounded-xl hover:bg-gray-100">Contact</button>
                <button className="w-1/2 py-2 border rounded-xl text-red-500 hover:bg-red-50">Delete</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
