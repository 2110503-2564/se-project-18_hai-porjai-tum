export default async function getRentals(token: string): Promise<RentalJson> {
    const response = await fetch("https://sw2-backend-backup1.onrender.com/api/v1/rentals", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch rentals")
    }
    return await response.json() as RentalJson
}