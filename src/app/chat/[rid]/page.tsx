"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import getRental from "@/libs/getRental";


export default function ChatRentalPage({ params }: { params: { rid: string } }) {
  const [selectedChat, setSelectedChat] = useState<RentalJson1|null>(null);
  const { data: session } = useSession()
  if(!session) return

  useEffect(() => {
    const getData = async () => {
      const res = await getRental(params.rid, session.user.token)
    //   fetch(`https://sw2-backend-backup1.onrender.com/api/v1/rentals/${params.rid}`, {
    //     method: "GET",
    //     headers: {
    //         authorization: `Bearer ${session?.user.token}`,
    //     },
    // });
      const json = await res;
      setSelectedChat(json);
      // console.log(json)
    };
    getData();
  }, []);

  // const [selectedChat, setSelectedChat] = useState<any>(null); // Default value is null
  const [message, setMessage] = useState(""); // For handling input message
  const [messages, setMessages] = useState<any[]>([]); // For storing chat messages

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

  return (
    <div>
      {!selectedChat ? (
        <p>Loading...</p>
      ) : (
        <div className="flex h-screen overflow-hidden">
       
        {/* Message area */}
        <div className="flex-1 flex flex-col relative">
          {selectedChat ? (
            <>
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
                    {msg.content}
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
            </>
          ) : (
            <div className="flex justify-center items-center h-full text-lg">
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </div>

        {/* Car detail area */}
        {selectedChat && (
          <div className="w-[300px] bg-white border-l p-4 flex flex-col">
            <Image src={selectedChat.data.car ? selectedChat.data.car.picture : "/img/Profile.png"} width={200} height={0} alt="car" className="object-none rounded-xl w-[30vw] h-[30vh]" />
            <h2 className="mt-4 text-xl font-bold">{selectedChat.data.car?.model}</h2>
            {/* <div className="text-gray-600 flex items-center gap-2 mt-2">
              👤 {selectedChat.carDetail.owner}
            </div>
            <div className="text-gray-600 flex items-center gap-2">
              📍 {selectedChat.carDetail.distance} away, {selectedChat.carDetail.location}
            </div> */}

            {/* Buttons */}
            <div className="mt-auto flex justify-between gap-2 pt-4 mb-12">
              <button className="w-1/2 py-2 border rounded-xl hover:bg-gray-100">Cancel</button>
              <button className="w-1/2 py-2 border rounded-xl text-red-500 hover:bg-red-50">Report</button>
            </div>
          </div>
        )}
      </div>
      // null
      )}
    </div>
      
  );
}
