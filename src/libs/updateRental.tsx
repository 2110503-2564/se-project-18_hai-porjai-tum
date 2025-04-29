import { Dayjs } from "dayjs"

export default async function updateRental(id: string, 
    pickupDate: Dayjs,
    returnDate: Dayjs,
    pickupLocation: string,
    returnLocation: string,
     token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rentals/${id}`, {
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