export default async function deleteCar(id: string, token: string) {
    const response = await fetch(`http://localhost:5000/api/v1/cars/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
}