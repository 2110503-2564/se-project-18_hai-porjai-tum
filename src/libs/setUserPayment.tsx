// In setUserPayment.ts (or wherever you define this function)
export default async function updateUserPayment(userId: string, payment: number, token: string) {
    console.log("Updating payment for user with ID = " + userId + " to payment = " + payment);

    const response = await fetch(`http://localhost:5000/api/v1/${userId}/setpayment`, {
        method: "POST", // POST method since we're updating
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            payment: payment  // Only send payment, no need for userId in the body
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}
