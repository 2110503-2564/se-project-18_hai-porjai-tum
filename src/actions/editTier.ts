"use server";

export async function editTier(id: number, data: { name: string; benefits: string }) {
  try {
    const res = await fetch(`/api/tiers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to edit tier");
    }

    return await res.json();
  } catch (err) {
    console.error("Edit Tier Error:", err);
    throw err;
  }
}