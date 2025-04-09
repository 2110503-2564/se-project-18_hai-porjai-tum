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

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (session) {
                try {
                    const userProfile = await getUserProfile(session.user.token);
                    // console.log(userProfile.data)
                    setProfile(userProfile.data);
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

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h2 className="text-3xl font-bold">User Profile</h2>
            <div className="w-96 p-8 bg-white rounded-lg shadow space-y-6 flex flex-col items-center">
                <Image
                    src="/img/user.jpg"
                    alt="User Profile"
                    width={96}
                    height={96}
                    className="rounded-full"
                />
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
                        <p>{getTier(profile?.payment)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
