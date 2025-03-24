import getCars from "@/libs/getCars";
import React, { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import CarCatalog from "@/components/CarCatalog";

export default function Car() {
    const carsPromise = getCars()
    return (
        <main className="text-center p-10">
            <h1 className="text-3xl font-medium">Select your car</h1>
            <Suspense fallback={<p>Loading Cars...<LinearProgress /></p>}>
                <CarCatalog carsJson={carsPromise} />
            </Suspense>
        </main>
    )
}