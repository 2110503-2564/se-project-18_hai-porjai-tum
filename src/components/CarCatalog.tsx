
import Link from "next/link";
import Card from "./Card";
import React, { Suspense } from "react";

export default async function VenueCatalog({ carsJson }: { carsJson: Promise<CarJson> }) {
    const carsJsonReady = await carsJson;
    // console.log(carsJsonReady.count)
    return (
        <>
            <h3>Explore {carsJsonReady.count} of each cars in our catalog</h3>
            <div style={{
                margin: "20px", display: "flex",
                flexDirection: "row", alignContent: "space-around",
                justifyContent: "space-around", flexWrap: "wrap", padding: "10px"
            }}>
                {
                    carsJsonReady.data.map((CarItem: CarItem) => (
                        <Link key={CarItem.id} href={`/car/${CarItem.id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%]
                        p-2 sm:p-4 md:p-4 lg:p-8">
                            <Card carName={CarItem.model}
                                imgSrc={CarItem.picture}
                                rating={5} />
                        </Link>
                    ))
                }
            </div>
        </>
    )
}