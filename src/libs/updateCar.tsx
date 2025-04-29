export default async function updateCar(id: string, name: string, model:string, tel:string, pricePerDay:number, picture:string, tier:string, token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cars/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
            model: model,
            tel: tel,
            pricePerDay: pricePerDay,
            picture: picture,
            tier: tier
        }),
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}