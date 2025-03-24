export default async function createRental(cid: string, rentalItem: RentalItem, token: string) {
    const response = await fetch(`http://localhost:5000/api/v1/cars/${cid}/rentals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rentalItem),
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}