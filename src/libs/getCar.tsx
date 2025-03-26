export default async function getCar(id: string) {
    const response = await fetch(`https://sw2-backend-backup1.onrender.com/api/v1/cars/${id}`)
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}