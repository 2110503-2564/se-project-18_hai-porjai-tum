import getVenues from "@/libs/getVenues";
import React, { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import VenueCatalog from "@/components/VenueCatalog";

export default function Venue() {
    const venuesPromise = getVenues()
    return (
        <main className="text-center p-10">
            <h1 className="text-3xl font-medium">Select your car</h1>
            <Suspense fallback={<p>Loading Cars...<LinearProgress /></p>}>
                <VenueCatalog venuesJson={venuesPromise} />
            </Suspense>
        </main>
    )
}