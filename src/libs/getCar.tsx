export default async function getCar(id: string) {
    const response = await fetch(`http://localhost:5000/api/v1/venues/${id}`)
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}