import Link from "next/link";
import Card from "./Card";
import React, { Suspense } from "react";

export default async function CarCatalog({ carsJson }: { carsJson: Promise<CarJson> }) {
    const carsJsonReady = await carsJson;
    
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
                        <Card carName={CarItem.model} imgSrc={CarItem.picture} rating={CarItem.rating} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
