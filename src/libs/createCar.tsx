export default async function createCar(name: string, model:string, tel:string, pricePerDay:number, picture:string, token: string) {
    const response = await fetch("http://localhost:5000/api/v1/cars", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
            model: model,
            tel: tel,
            pricePerDay: pricePerDay,
            picture: picture
        }),
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}