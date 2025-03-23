
import Link from "next/link";
import Card from "./Card";
import React, { Suspense } from "react";

export default async function VenueCatalog({ venuesJson }: { venuesJson: Promise<VenueJson> }) {
    const venuesJsonReady = await venuesJson;
    return (
        <>
            <h3>Explore {venuesJsonReady.count} of each cars in our catalog</h3>
            <div style={{
                margin: "20px", display: "flex",
                flexDirection: "row", alignContent: "space-around",
                justifyContent: "space-around", flexWrap: "wrap", padding: "10px"
            }}>
                {
                    venuesJsonReady.data.map((venueItem: VenueItem) => (
                        <Link key={venueItem.id} href={`/venue/${venueItem.id}`} className="w-1/5">
                            <Card venueName={venueItem.name}
                                imgSrc={venueItem.picture}
                                rating={5} />
                        </Link>
                    ))
                }
            </div>
        </>
    )
}