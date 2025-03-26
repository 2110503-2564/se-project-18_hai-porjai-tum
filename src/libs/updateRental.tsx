import { Dayjs } from "dayjs"

export default async function updateRental(id: string, 
    pickupDate: Dayjs,
    returnDate: Dayjs,
    pickupLocation: string,
    returnLocation: string,
     token: string) {
    const response = await fetch(`https://sw2-backend-backup1.onrender.com/api/v1/rentals/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            pickupDate: pickupDate,
            returnDate: returnDate,
            pickupLocation: pickupLocation,
            returnLocation: returnLocation,
        }),
    })
    if (!response.ok) {
        throw new Error("Failed to fetch rental")
    }
    return await response.json()
}