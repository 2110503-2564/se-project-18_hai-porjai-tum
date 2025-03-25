export default async function getRental(id: string, token: string) {
    const response = await fetch(`https://sw2-backend.onrender.com/api/v1/rentals/${id}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch rental")
    }
    return await response.json()
}