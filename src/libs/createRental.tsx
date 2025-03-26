export default async function createRental(cid: string, uid:string, rentalItem: RentalItem, token: string) {
    const response = await fetch(`https://sw2-backend-backup1.onrender.com/api/v1/cars/${cid}/rentals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            pickupDate: rentalItem.pickupDate,
            returnDate: rentalItem.returnDate,
            pickupLocation: rentalItem.pickupLocation,
            returnLocation: rentalItem.returnLocation,
            user: uid,
            car: cid,
        }),
        mode: 'cors',
    })
    if (!response.ok) {
        if(response.status === 400) alert(response.status + " you have already rent 3 cars")
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}