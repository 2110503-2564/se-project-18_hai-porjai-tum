export default async function deleteRental(id: string, token: string) {
    const response = await fetch(`http://localhost:5000/api/v1/rentals/${id}`, {
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