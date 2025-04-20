"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChatSelecter({ rentals }: { rentals:RentalJson }) {

  const router = useRouter()

  const [chats, setChats] = useState<RentalJson>(
  //   [
  //   {
  //     id: 1,
  //     name: "RX 7 2005",
  //     lastMessage: "I have a question about engines...",
  //     image: "/img/max.jpg",
  //     date: "15/03/2025",
  //     route: "/chat/test",
  //     carDetail: {
  //       model: "RX 7 2005",
  //       owner: "Teno Onet",
  //       location: "Rayong, Thailand",
  //       distance: "673km",
  //       image: "/img/Profile.png",
  //     },
  //   },
  //   {
  //       id: 2,
  //       name: "Nissan Gt2",
  //       lastMessage: "I have a question about insurances..",
  //       image: "/img/max2.jpg",
  //       date: "15/03/2025",
  //       route: "/chat/test2",
  //       carDetail: {
  //         model: "RX 7 2005",
  //         owner: "Teno Onet",
  //         location: "Rayong, Thailand",
  //         distance: "673km",
  //         image: "/img/max2.jpg",
  //       },
  //     },
  //     {
  //       id: 3,
  //       name: "Volvo r2",
  //       lastMessage: "I have a question about Parts..",
  //       image: "/img/dept.jpg",
  //       date: "15/03/2025",
  //       route: "/chat/test2",
  //       carDetail: {
  //         model: "RX 7 2005",
  //         owner: "Teno Onet",
  //         location: "Rayong, Thailand",
  //         distance: "673km",
  //         image: "/img/max2.jpg",
  //       },
  //     },
  //     {
  //       id: 4,
  //       name: "Duffy the Duck",
  //       lastMessage: "Is the duck alive ?",
  //       image: "/img/porjai.png",
  //       date: "15/03/2025",
  //       route: "/chat/admin",
  //       carDetail: {
  //         model: "RX 7 2005",
  //         owner: "Teno Onet",
  //         location: "Rayong, Thailand",
  //         distance: "673km",
  //         image: "/img/max2.jpg",
  //       },
  //     },
   
  // ]
  rentals
  );
  const [chats2, setChats2] = useState([
    {
      id: 1,
      name: "Admin Teno",
      lastMessage: "Talke to admin teno",
      image: "/img/teno.jpg",
      date: "15/03/2025",
      route: "/chat/test3",
      carDetail: {
        model: "RX 7 2005",
        owner: "Teno Onet",
        location: "Rayong, Thailand",
        distance: "673km",
        image: "/img/teno.jpg",
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
          {chats.data.map((chat) => (
            chat._id ?
            <div
              key={chat._id}
              onClick={() => router.push("/chat/" + chat._id)}
              className="flex items-center gap-3 p-4 hover:bg-gray-200 cursor-pointer border-b"
            >
              <Image src={chat.car ? chat.car.picture : "/img/Profile.png"}
                    alt={chat.car ? chat.car.name : "car pic"}
                    width={200} height={200}
                    className="w-12 h-12 rounded-full" />
              <div>
                <div className="font-semibold">{chat.car ? chat.car.name + " " + chat.car.model : "Porjai"}</div>
                <div className="text-sm text-gray-600">{chat.user}</div>
              </div>
            </div>
            : <></>
          ))
          }
        </div>
      ) : (
        <div >
           {chats2.map((chat) => (
            <div
              key={chat.id}
              onClick={() => router.push(chat.route)}
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
      )}
    </div>
  );
}
