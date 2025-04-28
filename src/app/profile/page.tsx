"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TopSpenders from "../topspender/page";
import Image from "next/image";
import getUserProfile from "@/libs/getUserProfile";
import getRentals from "@/libs/getRentals";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { getTier } from "@/utils/getTier";
import { getTierStyle } from "@/utils/getTierStyle";


function getStatusBorderColor(status: string) {
    switch (status) {
        case "green":
            return "border-green-200";
        case "yellow":
            return "border-yellow-400";
        case "gray":
            return "border-gray-400";
        default:
            return "border-white";
    }
}


function getStatusBadgeStyle(status: string) {
    switch (status) {
        case "green":
            return "bg-green-100 text-green-700";
        case "yellow":
            return "bg-yellow-100 text-yellow-700";
        default:
            return "bg-gray-200 text-gray-700";
    }
}

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [statusCircleColor, setStatusCircleColor] = useState("green");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recentRental, setRecentRental] = useState<RentalItem | null>(null);
    const router = useRouter();



    useEffect(() => {
        const fetchProfile = async () => {
            if (session) {
                try {
                    const userProfile = await getUserProfile(session.user.token);
                    const rentalsRes = await getRentals(session.user.token);
                    setProfile(userProfile.data);
                    setStatusCircleColor('green');

                    if (rentalsRes?.data?.length) {
                        const sortedRentals = rentalsRes.data.sort((a: RentalItem, b: RentalItem) =>
                            dayjs(b.pickupDate).diff(dayjs(a.pickupDate))
                        );
                        setRecentRental(sortedRentals[0]);
                    }

                } catch (err: any) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProfile();
    }, [session]);

    if (status === "loading" || loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading profile...</p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">You must be signed in to view your profile.</p>
            </div>
        );
    }

    const payment = profile?.payment as number; // cast ชัดๆ
    const userTier = getTier(payment);
    const tierStyle = getTierStyle(userTier);
    const statusText =
        statusCircleColor === "green" ? "Online" : statusCircleColor === "yellow" ? "Browsing" : "Offline";

    return (
        <div className="flex flex-col bg-[url('/img/tinderbg.png')] bg-cover bg-center  items-center justify-center min-h-screen px-4 py-10 space-y-6 ">
            <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
            <div
                className={`w-full max-w-md p-6 rounded-2xl border ${tierStyle.border} bg-gray-900  transition duration-300 hover:scale-[1.02]`}
            >
                <div className="flex flex-col items-center space-y-4">
                    <Image
                        src={profile?.name === "porjai" ? "/img/popop2.jpeg" : "/img/user.jpg"}
                        alt="User Profile"
                        width={100}
                        height={100}
                        className={`rounded-full border-4 ${tierStyle.shadow} shadow`}
                    />


                    <div className="text-center space-y-1">
                        <h3 className="text-xl font-semibold text-white">{profile?.name || "N/A"}</h3>
                        <p className="text-sm text-white">{profile?.email || "N/A"}</p>

                        {/* Status Badge */}
                        <span
                            className={`inline-block mt-2 px-3 py-1 text-sm rounded-full font-medium ${getStatusBadgeStyle(statusCircleColor)}`}
                        >
                            {statusText}
                        </span>

                        {/* Tier Badge */}
                        <span
                            className={`inline-block mt-2 ml-2 px-3 py-1 text-sm rounded-full font-medium ${tierStyle.badge}`}
                        >
                            {userTier} Tier
                        </span>
                    </div>

                    <div className="w-full mt-4">
                        <div className="flex justify-between text-white text-sm">
                            <span className="font-medium">Total Payment:</span>
                            <span>${profile?.payment?.toLocaleString() || "0"}</span>
                        </div>
                        <div className="relative w-full mt-4 group">
                            <button className="px-4 py-2 bg-red-400 text-white rounded-lg shadow hover:bg-orange-500 transition font-medium">
                                Recent Rental
                            </button>

                            {/* Hover Box */}
                            <div className="absolute left-0 top-full mt-2 w-full z-10 hidden group-hover:flex flex-col bg-white p-4 rounded-xl shadow-lg border border-orange-200">
                                {recentRental ? (
                                    <>
                                        <div className="text-sm font-semibold text-gray-700">
                                            {recentRental.car?.model}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {dayjs(recentRental.pickupDate).format("MMM D")} → {dayjs(recentRental.returnDate).format("MMM D")}
                                        </div>
                                        <div className="text-xs text-gray-600">Location: {recentRental.pickupLocation}</div>
                                        <div className="text-xs text-gray-600">Price: ${recentRental.assumePrice}</div>
                                    </>
                                ) : (
                                    <p className="text-xs text-gray-500">No recent rental data</p>
                                )}
                            </div>
                        </div>
                      
 



                    </div>

                </div>
            </div>

            <div className="flex space-x-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-red-400 text-white rounded-xl shadow hover:bg-orange-400 transition"
                >
                    View Privileges
                </button>
                <button
                    onClick={() => alert("Navigate to edit profile")}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl shadow hover:bg-gray-400 transition"
                >
                    Edit Profile
                </button>
            </div>
             {/* */}
    <div className="mt-4">
        <button
            onClick={() => window.location.href = "/add-balance"}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-orange-600 transition"
        >
            Top Up Balance
        </button>
    </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-80 space-y-4">
                        <h3 className="text-xl font-bold text-center">{userTier} Tier Privileges</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {tierStyle.perks.map((perk, idx) => (
                                <li key={idx}>{perk}</li>
                            ))}
                        </ul>
                        <div className="text-center mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
                
                
            )}
          
        </div>
        
        
    );
}
