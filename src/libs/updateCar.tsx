<<<<<<< HEAD
export default async function updateCar(id: string, name: string, model:string, tel:string, pricePerDay:number, picture:string, token: string) {
=======
export default async function updateCar(id: string, name: string, model:string, tel:string, pricePerDay:number, picture:string, tier:string, token: string) {
>>>>>>> d3db22c155123064ed0ed8467211e3e255492ed6
    const response = await fetch(`https://sw2-backend-backup1.onrender.com/api/v1/cars/${id}`, {
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
<<<<<<< HEAD
            picture: picture
=======
            picture: picture,
            tier: tier
>>>>>>> d3db22c155123064ed0ed8467211e3e255492ed6
        }),
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}