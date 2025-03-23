"use client"
import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "../redux/store"
import { removeBooking } from "../redux/features/bookSlice"

export default function BookingList() {
    const dispatch = useDispatch<AppDispatch>();
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems)

    return (
        <>
            {bookItems.length === 0 ? (
                <div className="text-center text-gray-500 text-lg mt-5">
                    No Car Rental
                </div>
            ) : (
                bookItems.map((rentalItem: RentalItem) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 flex justify-between items-center">
                        <div>
                            <div>CarId: {rentalItem.carId}</div>
                            <div className="text-md">numberOfDays: {rentalItem.numOfDays}</div>
                            <div className="text-md">Pickup Location: {rentalItem.returnLocation}</div>
                            <div className="text-md">Pickup Date: {rentalItem.pickupDate}</div>
                            <div className="text-md">Return Date: {rentalItem.returnDate}</div>
                            <div className="text-md">Return Location: {rentalItem.returnLocation}</div>
                        </div>
                        <button
                            onClick={() => dispatch(removeBooking(rentalItem))}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                            Remove
                        </button>
                    </div>
                ))
            )}
        </>
    )
}
