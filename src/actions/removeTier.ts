"use server";

export async function removeTier(id: number) {
  try {
    const res = await fetch(`/api/tiers/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete tier");
    }

    return { success: true };
  } catch (err) {
    console.error("Remove Tier Error:", err);
    throw err;
  }
}