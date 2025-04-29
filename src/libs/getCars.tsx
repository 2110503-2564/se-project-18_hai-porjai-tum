
export default async function getCars(): Promise<CarJson> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cars/`, { next: {tags:['cars']} })
    if (!response.ok) {
        throw new Error("Failed to fetch cars")
    }
    return await response.json() as CarJson
}