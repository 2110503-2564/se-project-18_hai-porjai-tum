import getRentals from "@/libs/getRentals"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/authOptions"
import MyRental from "@/components/MyRental"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

export default async function MyRentalPage() {
    return (
        <main className="pt-2">
                <h1 className="text-3xl font-medium flex justify-center">Your Rental Tickets</h1>
                <MyRental/>
        </main>
    )
}