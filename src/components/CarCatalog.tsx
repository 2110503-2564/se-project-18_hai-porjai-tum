import Link from "next/link";
import Card from "./Card";

import React, { Suspense } from "react";
import  getUserProfile  from "@/libs/getUserProfile";
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from "next-auth";


import ChatButton from "./ChatButton"; // 👈 เพิ่มตรงนี้



function getTier(price: number) {
    if (price < 1000) return "Bronze";
    else if (price < 2000) return "Silver";
    else if (price < 4000) return "Gold";
    else if (price < 7000) return "Platinum";
    else return "Diamond";
}
export default async function CarCatalog({ carsJson }: { carsJson: Promise<CarJson> }) {

  

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null
    const [carsJsonReady, User] = await Promise.all([carsJson, getUserProfile(session.user.token)]);
    const Tier = getTier(User.data.payment)
    console.log(User.data.payment);
    
    


    



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
                {carsJsonReady.data.map((CarItem: CarItem) => (
                    <Link
                        key={CarItem.id}
                        href={`/car/${CarItem.id}`}
                        className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8"
                    >
                        <Card carName={CarItem.name} imgSrc={CarItem.picture} rating={CarItem.rating}  tier ={CarItem.tier} userTier = {Tier} />
                    </Link>
                ))}
            </div>

            <ChatButton /> {/* 👈 แทรกปุ่มตรงนี้ */}
        </div>
    );
}
