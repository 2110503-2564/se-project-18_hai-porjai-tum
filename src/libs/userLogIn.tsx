export default async function userLogIn(userEmail: string, userPassword: string) {
    const response = await fetch("https://sw2-backend-backup1.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
        }),
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json();
    // console.log("🔹 API Response:", data); // Debugging

    // Ensure the response contains user data
    if (!data || !data.user || !data.user.id) {
        throw new Error("Invalid user data received");
    }

    // Return correct structure expected by NextAuth
    return {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token, // Ensure token is included
<<<<<<< HEAD
        payment: data.payment
=======
        payment: data.user.payment
>>>>>>> d3db22c155123064ed0ed8467211e3e255492ed6
    };
}
