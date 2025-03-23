'use client'
import { useReducer, useState } from "react";
import Card from "./Card";
import * as React from 'react';
import Link from "next/link";
export default function CardPanel() {
    const [carResponse, setVenueResponse] = useState<CarItem[] | null>(null);

    const compareReducer = (compareList: Map<string, number>, action: { type: string, carName: string, rating?: number | 0 }) => {
        switch (action.type) {
            case 'add': {
                return new Map(compareList.set(action.carName, action.rating || 0));
            }
            case 'remove': {
                compareList.delete(action.carName);
                return new Map(compareList);
            }
            default:
                return compareList;
        }
    };

    const [compareList, dispatchCompare] = useReducer(compareReducer, new Map<string, number>());
    // Mock Data for Demonstration Only
    // const mockVenueRepo = [
    //     { vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg" },
    //     { vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg" },
    //     { vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg" }
    // ];
    if (!carResponse) return (<p>Venue Panel is Loading...</p>)
    return (
        <div>
            <div style={{
                margin: "20px", display: "flex",
                flexDirection: "row", alignContent: "space-around",
                justifyContent: "space-around", flexWrap: "wrap", padding: "10px"
            }}>
                {
                    carResponse.map((CarItem) => (
                        <div className="w-1/5">
                            <Link href={`/venue/${CarItem.id}`} className="w-1/5">
                                <Card
                                    carName={CarItem.name}
                                    imgSrc={CarItem.picture}
                                    rating={5} 
                                />
                            </Link>
                        </div>

                    ))
                }
                {/* <Card carName="The Bloom Pavilion" imgSrc="/img/bloom.jpg"
                onCompare={handleCompare}
            />
            <Card carName="Spark Space" imgSrc="/img/sparkspace.jpg"
                onCompare={handleCompare}
            />
            <Card carName="The Grand Table" imgSrc="/img/grandtable.jpg"
                onCompare={handleCompare}
            /> */}
            </div>
            <div style={{
                margin: "20px", display: "flex", alignItems: "flex-start",
                flexDirection: "column",
                justifyContent: "flex-start", flexWrap: "wrap", padding: "10px"
            }}>
                <div className="text-xl font-medium">Venue List Ratings: {compareList.size}</div>
                {Array.from(compareList).map(([carName, rating]) => (
                    <div key={carName}
                        onClick={() => dispatchCompare({ type: 'remove', carName })}
                        style={{ cursor: "pointer" }}
                        data-testid={carName}>
                        {carName}: {rating}
                    </div>
                ))
                }
            </div >
        </div >
    )
}
