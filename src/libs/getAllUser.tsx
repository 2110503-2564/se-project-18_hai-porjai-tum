export default async function getAllUsers(authToken: string) {
    const response = await fetch("https://sw2-backend-backup1.onrender.com/api/v1/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
        },
        cache: "no-store", // optional, avoids caching
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch users. Status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.data)) {
        throw new Error("Invalid response format: expected 'data' array");
    }

    return data.data;
}
