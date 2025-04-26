import Link from "next/link";
import Card from "./Card";
import React from "react";
import getUserProfile from "@/libs/getUserProfile";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import ChatButton from "./ChatButton";
import FilterMenu from "./FilterMenu"; // 👈 import filter menu

function getTier(price: number) {
  if (price < 1000) return "Bronze";
  else if (price < 2000) return "Silver";
  else if (price < 4000) return "Gold";
  else if (price < 7000) return "Ruby";
  else return "Diamond";
}

function tierRank(tier: string): number {
  switch (tier) {
    case "Bronze":
      return 1;
    case "Silver":
      return 2;
    case "Gold":
      return 3;
    case "Ruby":
      return 4;
    case "Diamond":
      return 5;
    default:
      return 0;
  }
}

export default async function CarCatalog({
  carsJson,
}: {
  carsJson: Promise<CarJson>;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const [carsJsonReady, User] = await Promise.all([
    carsJson,
    getUserProfile(session.user.token),
  ]);

  const Tier = getTier(User.data.payment);

  return (
    <div className="pt-10 px-4 flex flex-col lg:flex-row gap-6">
      {/* Left Filter Menu */}
      <div className="w-full lg:w-[250px]">
        <FilterMenu />
      </div>

      {/* Car Catalog Content */}
      <div className="flex-1">
        <div className="flex flex-wrap justify-around ">
          {carsJsonReady.data.map((CarItem: CarItem) => {
            const canAccess = tierRank(Tier) >= tierRank(CarItem.tier);

            return (
              <div className="w-full md:w-1/3 p-0.5" key={CarItem.id}>
                <Link href={`/car/${CarItem.id}`}>
                  <Card
                    carName={CarItem.name}
                    imgSrc={CarItem.picture}
                    rating={CarItem.rating}
                    tier={CarItem.tier}
                    userTier={Tier}
                  />
                </Link>
              </div>
            );
          })}
        </div>

        <ChatButton session={session} />
      </div>
    </div>
  );
}
