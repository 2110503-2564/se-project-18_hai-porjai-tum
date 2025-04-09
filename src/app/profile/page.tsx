"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import getUserProfile from "@/libs/getUserProfile";

function getTier(price: number) {
    if (price < 1000) return "Bronze";
    else if (price < 2000) return "Silver";
    else if (price < 4000) return "Gold";
    else if (price < 7000) return "Platinum";
    else return "Diamond";
}

function getTierColor(tier: string) {
    switch (tier) {
        case "Bronze":
            return "border-bronze-500 bg-bronze-100";
        case "Silver":
            return "border-silver-500 bg-silver-100";
        case "Gold":
            return "border-yellow-500 bg-yellow-100";
        case "Platinum":
            return "border-blue-500 bg-blue-100";
        case "Diamond":
            return "border-cyan-500 bg-cyan-100";
        default:
            return "border-gray-500 bg-gray-100";
    }
}

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [statusCircleColor, setStatusCircleColor] = useState("green"); // default to green (logged in)

    useEffect(() => {
        const fetchProfile = async () => {
            if (session) {
                try {
                    const userProfile = await getUserProfile(session.user.token);
                    setProfile(userProfile.data);
                    // Simulate user status (you can replace this with actual logic)
                    setStatusCircleColor('green'); // If logged in
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
                <p className="text-red-500">
                    {"You must be signed in to view your profile."}
                </p>
            </div>
        );
    }

    const userTier = getTier(profile?.payment);
    const tierColor = getTierColor(userTier);

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h2 className="text-3xl font-bold">User Profile</h2>
            <div className={`w-96 p-8 rounded-lg shadow space-y-6 flex flex-col items-center ${tierColor}`}>
                {/* Profile Picture with border according to tier */}
                <div className={`border-4 rounded-full ${tierColor} p-2 relative`}>
                    <Image
                        src={profile?.name === "porjai" ? "/img/Profile.png" : "/img/user.jpg"}
                        alt="User Profile"
                        width={96}
                        height={96}
                        className="rounded-full"
                    />
                    {/* Status Circle */}
                    <div
                        className={`w-6 h-6 rounded-full absolute bottom-0 right-1 border-2 ${
                            statusCircleColor === "green" ? "bg-green-500" : "bg-yellow-500"
                        }`}
                    ></div>
                </div>

                <div className="w-full space-y-2">
                    <div className="flex items-center">
                        <p className="text-gray-600 font-semibold w-24">Name:</p>
                        <p>{profile?.name || "N/A"}</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-gray-600 font-semibold w-24">Email:</p>
                        <p>{profile?.email || "N/A"}</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-gray-600 font-semibold w-24">Tier:</p>
                        <p>{userTier}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
