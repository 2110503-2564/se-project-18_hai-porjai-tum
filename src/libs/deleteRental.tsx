export default async function deleteRental(id: string, token: string) {
    const response = await fetch(`https://sw2-backend.onrender.com/api/v1/rentals/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
}