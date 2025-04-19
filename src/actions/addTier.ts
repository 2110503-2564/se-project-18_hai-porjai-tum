"use server";

export async function addTier(data: { name: string; benefits: string }) {
  try {
    const res = await fetch("/api/tiers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to add tier");
    }

    return await res.json();
  } catch (err) {
    console.error("Add Tier Error:", err);
    throw err;
  }
}