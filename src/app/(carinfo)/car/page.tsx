import getCars from "@/libs/getCars";
import React, { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import CarCatalog from "@/components/CarCatalog";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Car() {
    const carsPromise = getCars()
    return (
        
        <main className="relative w-full h-screen bg-[url('/img/Component.png')] bg-cover bg-center">
            
            <Suspense fallback={<p>Loading Cars...<LinearProgress /></p>}>
                <CarCatalog carsJson={carsPromise} />
            </Suspense>
            <Footer />
        </main>
    )
}