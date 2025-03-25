"use client"
import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "../redux/store"
import { removeRental } from "../redux/features/rentSlice"
import createRental from "@/libs/createRental";
import { useSession } from "next-auth/react";

export default function RentalList() {
    const dispatch = useDispatch<AppDispatch>();
    const rentItems = useAppSelector((state) => state.rentSlice.rentItems)
    const { data: session } = useSession()

    const handlePostRequest = async (rentalItem:RentalItem) => {
        if(session && session.user.token)
        try {
            const response = await createRental(rentalItem.carId, session.user._id, rentalItem, session.user.token)
            if (response.success) {
                dispatch(removeRental(rentalItem))
            }
            // alert(response.success)
        } catch (error) {
            console.log("Failed to send data")
          }
    }

    return (
        <>
            {rentItems.length === 0 ? (
                <div className="text-center text-gray-500 text-lg mt-5">
                    No Car Rental
                </div>
            ) : (
                <div className="pt-2">{
                rentItems.map((rentalItem: RentalItem) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 flex justify-between items-center">
                        <div>
                            <div>Model: {rentalItem.carModel}</div>
                            <div className="text-md">Number Of Days: {rentalItem.numOfDays}</div>
                            <div className="text-md">Pickup Location: {rentalItem.returnLocation}</div>
                            <div className="text-md">Pickup Date: {rentalItem.pickupDate}</div>
                            <div className="text-md">Return Location: {rentalItem.returnLocation}</div>
                            <div className="text-md">Return Date: {rentalItem.returnDate}</div>
                        </div>
                        <div>
                        <button
                            onClick={() => handlePostRequest(rentalItem)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-emerald-700 transition mx-1">
                            confirm
                        </button>
                        <button
                            onClick={() => dispatch(removeRental(rentalItem))}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition mx-1">
                            Remove
                        </button>
                        </div>
                    </div>
                ))
                }</div>
            )}
        </>
    )
}
