import Link from "next/link";
import Card from "./Card";
<<<<<<< HEAD
import React, { Suspense } from "react";

export default async function CarCatalog({ carsJson }: { carsJson: Promise<CarJson> }) {
    const carsJsonReady = await carsJson;
    
=======

import React, { Suspense } from "react";
import getUserProfile from "@/libs/getUserProfile";
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from "next-auth";


import ChatButton from "./ChatButton"; // 👈 เพิ่มตรงนี้



function getTier(price: number) {
    if (price < 1000) return "Bronze";
    else if (price < 2000) return "Silver";
    else if (price < 4000) return "Gold";
    else if (price < 7000) return "Ruby";
    else return "Diamond";
}
function tierRank(tier: string): number {
    switch (tier) {
        case "Bronze": return 1;
        case "Silver": return 2;
        case "Gold": return 3;
        case "Ruby": return 4;
        case "Diamond": return 5;
        default: return 0;
    }
}

export default async function CarCatalog({ carsJson }: { carsJson: Promise<CarJson> }) {

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null
    const [carsJsonReady, User] = await Promise.all([carsJson, getUserProfile(session.user.token)]);
    const Tier = getTier(User.data.payment)
    console.log(User.data.payment);

>>>>>>> d3db22c155123064ed0ed8467211e3e255492ed6
    return (
        <div className="pt-10">
            <h3 className="text-3xl font-bold text-lg text-white text-center">
                Explore {carsJsonReady.count}
                <span className="inline-block mx-2">
                    <img src="/img/tinder.png" alt="logo" className="inline-block w-8 h-8" />
                </span>
                of each cars in our catalog
            </h3>

            <div
                style={{
                    margin: "20px",
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "space-around",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                    padding: "10px",
                }}
            >
<<<<<<< HEAD
                {carsJsonReady.data.map((CarItem: CarItem) => (
                    <Link
                        key={CarItem.id}
                        href={`/car/${CarItem.id}`}
                        className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8"
                    >
                        <Card carName={CarItem.model} imgSrc={CarItem.picture} rating={CarItem.rating} />
                    </Link>
                ))}
            </div>
=======
                {carsJsonReady.data.map((CarItem: CarItem) => {
                    const canAccess = tierRank(Tier) >= tierRank(CarItem.tier);

                    return canAccess ? (
                        <Link
                            key={CarItem.id}
                            href={`/car/${CarItem.id}`}
                            className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8"
                        >
                            <Card carName={CarItem.name} imgSrc={CarItem.picture} rating={CarItem.rating} tier={CarItem.tier} userTier={Tier} />
                        </Link>
                    ) : (
                        <div
                            key={CarItem.id}
                            className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8"
                            title="This car is locked for your current tier"
                        >
                            <Card carName={CarItem.name} imgSrc={CarItem.picture} rating={CarItem.rating} tier={CarItem.tier} userTier={Tier} />
                        </div>
                    );
                })}

            </div>

            <ChatButton /> {/* 👈 แทรกปุ่มตรงนี้ */}
>>>>>>> d3db22c155123064ed0ed8467211e3e255492ed6
        </div>
    );
}
