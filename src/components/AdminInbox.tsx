"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RentalJson {
  data: any[];
}

interface AdminUser {
  _id: string;
  name: string;
  image?: string;
}

export default function AdminInbox({ rentals, admins }: { rentals: RentalJson; admins: AdminUser[] }) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"rental" | "admin">("rental");

  const handleTabChange = (tab: "rental" | "admin") => {
    setSelectedTab(tab);
  };

  return (
    <div className="border border-silver overflow-y-auto h-full">
    {/* Tabs */}
    <div className="sticky top-0 z-10 bg-white">
      <div className="flex justify-around py-2 border-b bg-white">
        <div
          className={`cursor-pointer text-base font-semibold ${
            selectedTab === "rental" ? "text-red-600 border-b-2 border-red-500" : "text-gray-600"
          }`}
          onClick={() => handleTabChange("rental")}
        >
          Inbox
        </div>
        <div
          className={`cursor-pointer text-base font-semibold ${
            selectedTab === "admin" ? "text-red-600 border-b-2 border-red-500" : "text-gray-600"
          }`}
          onClick={() => handleTabChange("admin")}
        >
          Friends
        </div>
      </div>
    </div>

    {/* Content */}
    {selectedTab === "rental" ? (
      <div>
        {rentals.data.map((chat) =>
          chat._id ? (
            <div
              key={chat._id}
              onClick={() => router.push("/inbox/" + chat._id)}
              className="flex items-center gap-3 p-4 hover:bg-gray-200 cursor-pointer border-b"
            >
              <Image
                src={chat.car ? chat.car.picture : "/img/Profile.png"}
                alt={chat.car ? chat.car.name : "car"}
                width={200}
                height={200}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-semibold">
                  {chat.car ? `${chat.car.name} ${chat.car.model}` : "Porjai"}
                </div>
                <div className="text-sm text-gray-600">{chat.user?.name}</div>
              </div>
            </div>
          ) : null
        )}
      </div>
    ) : (
      <div>
        {admins.map((admin) => (
          <div
            key={admin._id}
            onClick={() => router.push(`/inbox/admin-chat/${admin._id}`)}
            className="flex items-center gap-3 p-4 hover:bg-gray-200 cursor-pointer border-b"
          >
            <Image
              src={admin.name === "porjai" ? "/img/popop2.jpeg" : "/img/max.jpg"}
              alt={admin.name}
              width={200}
              height={200}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="font-semibold">{admin.name}</div>
              <div className="text-sm text-gray-600">Talk to {admin.name}</div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  );
}
