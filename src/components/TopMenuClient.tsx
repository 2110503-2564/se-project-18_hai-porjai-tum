"use client";

import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NewsTicker from "./NewsTicker";

// Import the Inter font from Google Fonts
import { Inter } from "next/font/google";
import ChatButton from "./ChatButton";
import { useSession } from "next-auth/react";
import { getTier } from "@/utils/getTier";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function TopMenuClient() {
  const { data: session,status } = useSession();
  const router = useRouter();
  const [showManageDropdown, setShowManageDropdown] = useState(false);
  
  const [showPrivilege, setShowPrivilege] = useState(false);
  
  if (status === "loading") {
    return <div>Loading...</div>; // ตอน session กำลังโหลด
  }


  const TopMenuItemWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="bg-gray-800/60 hover:bg-gray-700/70 text-white px-4 py-1 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer">
        {children}
      </div>
    );
  };

  const getTierStyle = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return {
          bg: "bg-[#fff8f1]",
          border: "border-[#cd7f32]",
          text: "text-[#cd7f32]",
          badge: "bg-[#cd7f32]/20 text-[#cd7f32]",
          shadow: "shadow-[0_0_10px_#cd7f32]",
        };
      case "Silver":
        return {
          bg: "bg-[#f9f9f9]",
          border: "border-[#c0c0c0]",
          text: "text-[#c0c0c0]",
          badge: "bg-[#c0c0c0]/20 text-[#c0c0c0]",
          shadow: "shadow-[0_0_10px_#c0c0c0]",
        };
      case "Gold":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-700",
          badge: "bg-yellow-100 text-yellow-700",
          shadow: "shadow-[0_0_12px_rgba(234,179,8,0.6)]",
        };
      case "Ruby":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-700",
          badge: "bg-blue-100 text-blue-700",
          shadow: "shadow-[0_0_12px_rgba(96,165,250,0.6)]",
        };
      case "Diamond":
        return {
          bg: "bg-cyan-50",
          border: "border-cyan-100",
          text: "text-cyan-700",
          badge: "bg-cyan-100 text-cyan-700",
          shadow: "shadow-[0_0_12px_rgba(34,211,238,0.6)]",
        };
      default:
        return {
          bg: "bg-white",
          border: "border-gray-200",
          text: "text-gray-700",
          badge: "bg-gray-100 text-gray-700",
          shadow: "",
        };
    }
  };

  return (
    <div
      className={`h-[60px] bg-gray-900 fixed top-0 right-0 z-50 border-b border-gray-700 flex items-center w-full px-4 ${inter.className}`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/img/carlogo.png"
          alt="logo"
          width={30}
          height={30}
          className="h-full w-auto"
        />
      </Link>

      {/* Menu Items */}
      <ul className="left-8 flex items-center gap-8 relative">
        <li className="pr-6 border-r border-red-500">
          <Link href="/promo">
            <div className="text-white cursor-pointer hover:text-gray-400">
              Promos
            </div>
          </Link>
        </li>

        {/* Privilege Dropdown */}
        <li className="relative pr-6 border-r border-red-500">
          <div
            className="text-white cursor-pointer flex items-center gap-1 hover:text-gray-400"
            onClick={() => setShowPrivilege(!showPrivilege)}
          >
            Tiers
            <Image
              src="/img/dropdown.png"
              alt="Dropdown Icon"
              width={12}
              height={12}
            />
          </div>
          {showPrivilege && (
            <div className="absolute top-full mt-2 w-56 bg-white text-black shadow-lg rounded-md z-50 p-2">
              {["Bronze", "Silver", "Gold", "Ruby", "Diamond"].map((tier) => {
                const style = getTierStyle(tier);
                return (
                  <Link
                    key={tier}
                    href={`/tier/${tier}`}
                    className={`block rounded-md px-4 py-2 my-1 transition-all hover:scale-[1.02] ${style.bg} ${style.border} ${style.text}`}
                  >
                    {tier}
                  </Link>
                );
              })}
            </div>
          )}
        </li>

        <li className="pr-6 border-r border-red-500">
          <Link href="/about">
            <div className="text-white cursor-pointer hover:text-gray-400">
              About us
            </div>
          </Link>
        </li>
      </ul>

      {/* Centered News Section */}
      <div className="flex-1 flex justify-center">
        <NewsTicker />
      </div>

      {/* Right-side */}
      <div className="flex items-center gap-6 ml-auto text-white">
        {session && session.user ? (
          <>
            <div className="flex items-center gap-3">
              <TopMenuItemWrapper>
                <TopMenuItem title="Cart" pageRef="/mycart" />
              </TopMenuItemWrapper>
              <TopMenuItemWrapper>
                <TopMenuItem
                  title={
                    session.user.role === "admin" ? "Rentals" : "My Rentals"
                  }
                  pageRef="/myrental"
                />
              </TopMenuItemWrapper>
              {/* Admin Manage Dropdown - Styled */}
              {session.user.role === "admin" && (
                <div className="relative">
                  <TopMenuItemWrapper>
                    <div
                      className="text-center my-auto font-verdana text-[10pt] text-gray-500 flex flex-row gap-2"
                      onClick={() => setShowManageDropdown(!showManageDropdown)}
                    >
                      Manage
                      <Image
                        src="/img/dropdown.png"
                        alt="Dropdown Icon"
                        width={12}
                        height={12}
                        className={`object-scale-down transition-transform duration-200 ${
                          showManageDropdown ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  </TopMenuItemWrapper>
                  {showManageDropdown && (
                    <div className="absolute right-0 mt-2 w-44 bg-gray-800 text-white border border-gray-700 rounded-xl shadow-xl animate-fade-in overflow-hidden z-50">
                      <Link href="/manage/cars">
                        <div className="px-4 py-2 hover:bg-gray-700 transition-all flex items-center gap-2 cursor-pointer font-verdana ">
                          🚗 <span>Manage Cars</span>
                        </div>
                      </Link>
                      <Link href="/manage/users">
                        <div className="px-4 py-2 hover:bg-gray-700 transition-all flex items-center gap-2 cursor-pointer font-verdana ">
                          👤 <span>Manage Users</span>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link href="/api/auth/signout">
              <div className="cursor-pointer hover:text-gray-400 text-white">
                Sign-Out
              </div>
            </Link>
            {(() => {
              const tier = getTier(session.user.payment) || "Bronze";
              const style = getTierStyle(tier);
              const chatHref =
                session.user.role === "admin" ? "/chat/admin" : "/chat";

              return (
                <>
                  {/* Chat Button (Only for Admin) */}
                  {session.user.role === "admin" && (
                    <Link href="/inbox">
                      <div
                        className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 ${
                          session.user.role === "admin"
                            ? "bg-red-400 hover:bg-orange-400"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                        title="Go to Inbox"
                      >
                        <Image
                          src="/img/chat3.png"
                          alt="Chat"
                          width={20}
                          height={20}
                        />
                      </div>
                    </Link>
                  )}

                  {/* Profile Button */}
                  <Link href="/profile">
                    <div
                      className={`flex items-center gap-3 px-3 py-1 rounded-full text-sm ${style.badge} ${style.shadow}`}
                    >
                      <Image
                        src={
                          session.user.name === "porjai"
                            ? "/img/popop2.jpeg"
                            : "/img/user.jpg"
                        }
                        alt="User Profile"
                        width={36}
                        height={36}
                        className="rounded-full border border-white"
                      />
                      <div className="flex flex-col items-start leading-tight">
                        <span className="font-semibold">
                          {session.user.name || "User"}
                        </span>
                        {/* <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">
                          {session.user.balance?.toLocaleString() || "0"} THB
                        </span> */}
                      </div>
                    </div>
                  </Link>
                </>
              );
            })()}
          </>
        ) : (
          <>
            <Link href="/api/auth/signin">
              <div className="cursor-pointer hover:text-gray-400 text-white">
                Sign-In
              </div>
            </Link>
            <Link href="/register">
              <div className="cursor-pointer hover:text-gray-400 text-white">
                Register
              </div>
            </Link>
          </>
        )}
      </div>
      <ChatButton session={session} />
    </div>
  );
}
