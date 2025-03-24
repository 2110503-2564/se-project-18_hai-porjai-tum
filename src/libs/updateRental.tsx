export default async function updateRental(id: string, rentalItem: RentalItem, token: string) {
    const response = await fetch(`http://localhost:5000/api/v1/rentals/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rentalItem),
    })
    if (!response.ok) {
        throw new Error("Failed to fetch rental")
    }
    return await response.json()
}