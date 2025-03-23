
import Link from "next/link";
import Card from "./Card";
import React, { Suspense } from "react";

export default async function VenueCatalog({ carsJson }: { carsJson: Promise<CarJson> }) {
    const carsJsonReady = await carsJson;
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
                        <Link key={CarItem.id} href={`/venue/${CarItem.id}`} className="w-1/5">
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