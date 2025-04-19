
export default async function getCars(): Promise<CarJson> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const response = await fetch("https://sw2-backend-backup1.onrender.com/api/v1/cars/", { next: {tags:['cars']} })
    if (!response.ok) {
        throw new Error("Failed to fetch cars")
    }
    return await response.json() as CarJson
}