export default async function getRentalsForCar(cid: string, token: string) {
    const response = await fetch(`http://localhost:5000/api/v1/cars/${cid}/rentals`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}