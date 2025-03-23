
export default async function getCars(): Promise<CarJson> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const response = await fetch("https://a08-venue-explorer-backend.vercel.app/api/v1/venues")
    if (!response.ok) {
        throw new Error("Failed to fetch venues")
    }
    return await response.json() as CarJson
}