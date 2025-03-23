export default async function updateCar(id: string, carItem: CarItem, token: string) {
    const response = await fetch(`http://localhost:5000/api/v1/cars/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(carItem),
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}