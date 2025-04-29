export default async function updateUserPayment(payment: Number, token: string) {
    console.log("Payment = " + payment)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            payment: payment
        }),
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}