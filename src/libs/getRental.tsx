export default async function getRental(id: string, token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rentals/${id}`, {
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