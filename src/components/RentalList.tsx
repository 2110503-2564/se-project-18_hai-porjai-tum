"use client"
import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "../redux/store"
import { removeRental } from "../redux/features/rentSlice"
import createRental from "@/libs/createRental";
import { useSession } from "next-auth/react";
<<<<<<< HEAD
=======
import updateUserPayment from "@/libs/updateUserPayment";
>>>>>>> d3db22c155123064ed0ed8467211e3e255492ed6

export default function RentalList() {
    const dispatch = useDispatch<AppDispatch>();
    const rentItems = useAppSelector((state) => state.rentSlice.rentItems)
    const { data: session } = useSession()

<<<<<<< HEAD
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
=======
    const handlePostRequest = async (rentalItem: RentalItem) => {
        if (session && session.user.token)

            try {
                const response = await createRental(rentalItem.carId, session.user._id, rentalItem, session.user.token)
                if (response.success) {
                    dispatch(removeRental(rentalItem))
                }
                await updateUserPayment(response.data.assumePrice, session.user.token); // Assuming token is available
                // alert(response.success)
            } catch (error) {
                console.log("Failed to send data")
            }
>>>>>>> d3db22c155123064ed0ed8467211e3e255492ed6
    }

    return (
        <>
            {rentItems.length === 0 ? (
                <div className="text-center text-gray-500 text-lg mt-5">
                    No Car Rental
                </div>
            ) : (
                <div className="pt-2">{
<<<<<<< HEAD
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
=======
                    rentItems.map((rentalItem: RentalItem) => (
                        <div className="pt-2 space-y-4 px-4">{
                            rentItems.map((rentalItem: RentalItem, index) => (
                                <div key={index} className="ticket-shape border border-orange-400 bg-white p-4 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 max-w-4xl mx-auto">
                                    <div className="text-gray-800 text-sm space-y-1 w-full sm:w-2/3">
                                        <div className="text-lg font-semibold text-orange-500">🚗 Model: {rentalItem.carModel}</div>
                                        <div>📅 Number Of Days: {rentalItem.numOfDays}</div>
                                        <div>📍 Pickup Location: {rentalItem.pickupLocation}</div>
                                        <div>🕑 Pickup Date: {rentalItem.pickupDate}</div>
                                        <div>📍 Return Location: {rentalItem.returnLocation}</div>
                                        <div>🕑 Return Date: {rentalItem.returnDate}</div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto justify-end">
                                        <button
                                            onClick={() => handlePostRequest(rentalItem)}
                                            className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-green-600 transition"
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            onClick={() => dispatch(removeRental(rentalItem))}
                                            className="bg-orange-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        }</div>
                        
                    ))
>>>>>>> d3db22c155123064ed0ed8467211e3e255492ed6
                }</div>
            )}
        </>
    )
}
