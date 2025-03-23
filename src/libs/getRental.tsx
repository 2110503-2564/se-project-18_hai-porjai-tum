export default async function getRental(id: string, token: string) {
    const response = await fetch(`http://localhost:5000/api/v1/rentals/${id}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch venue")
    }
    return await response.json()
}