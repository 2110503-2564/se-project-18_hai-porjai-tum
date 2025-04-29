export default async function getCar(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cars/${id}`)
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}