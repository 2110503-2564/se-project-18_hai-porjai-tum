"use client";

import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

type Props = {
  session: any; // or your custom session type
};

export default function ChatButton({ session }: Props) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const isAdmin = session?.user?.role === "admin";
  const redirectPath = isAdmin ? "/chat" : "/chat";

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="bg-white text-gray-800 text-base font-medium leading-relaxed p-4 rounded-2xl shadow-xl max-w-sm transition-opacity duration-300 border border-blue-200">
          {isAdmin ? (
            <span className="font-semibold text-red-500">
              เปิดกล่องข้อความจากลูกค้า
            </span>
          ) : (
            <>
              <span className="font-semibold text-blue-600">
                สามารถสอบถามเพิ่มเติมได้ในนี้
              </span>
              <br />
              ทางเรามีแอดมินคอยบริการ
              <span className="text-green-600 font-semibold">
                {" "}
                ตลอด 24 ชั่วโมง
              </span>
            </>
          )}
        </div>
      )}

      <button
        onClick={() => router.push(redirectPath)}
        className={`${
          isAdmin
            ? "bg-gradient-to-br from-red-600 to-red-400"
            : "bg-gradient-to-br from-green-500 to-indigo-600"
        } text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
          hovered ? "animate-shake" : ""
        }`}
        aria-label="Chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
