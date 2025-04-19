"use client";

import { useState } from "react";

type Tier = {
  id: number;
  name: string;
  benefits: string;
};

export default function TierList() {
  const [tiers, setTiers] = useState<Tier[]>([
    { id: 1, name: "Free", benefits: "Basic access" },
    { id: 2, name: "Premium", benefits: "More access" },
  ]);

  const [newTier, setNewTier] = useState({ name: "", benefits: "" });
  const [editingTierId, setEditingTierId] = useState<number | null>(null);
  const [editedTier, setEditedTier] = useState({ name: "", benefits: "" });

  const handleAdd = () => {
    if (!newTier.name || !newTier.benefits) return;
    setTiers([...tiers, { ...newTier, id: Date.now() }]);
    setNewTier({ name: "", benefits: "" });
  };

  const handleDelete = (id: number) => {
    setTiers(tiers.filter((tier) => tier.id !== id));
  };

  const handleEdit = (tier: Tier) => {
    setEditingTierId(tier.id);
    setEditedTier({ name: tier.name, benefits: tier.benefits });
  };

  const handleSaveEdit = () => {
    setTiers(
      tiers.map((tier) =>
        tier.id === editingTierId
          ? { ...tier, name: editedTier.name, benefits: editedTier.benefits }
          : tier
      )
    );
    setEditingTierId(null);
    setEditedTier({ name: "", benefits: "" });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: "1rem" }}>🎯 Tier Management</h2>

      <div style={{ marginBottom: "2rem" }}>
        <h3>Add New Tier</h3>
        <input
          placeholder="Tier name"
          value={newTier.name}
          onChange={(e) => setNewTier({ ...newTier, name: e.target.value })}
          style={{ marginRight: "0.5rem", padding: "0.4rem", borderRadius: 4 }}
        />
        <input
          placeholder="Benefits"
          value={newTier.benefits}
          onChange={(e) =>
            setNewTier({ ...newTier, benefits: e.target.value })
          }
          style={{ marginRight: "0.5rem", padding: "0.4rem", borderRadius: 4 }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "0.4rem 1rem",
            borderRadius: 4,
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Tier
        </button>
      </div>

      <h3>Tier List</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: "8px" }}>Name</th>
            <th style={{ padding: "8px" }}>Benefits</th>
            <th style={{ padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr key={tier.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "8px" }}>
                {editingTierId === tier.id ? (
                  <input
                    value={editedTier.name}
                    onChange={(e) =>
                      setEditedTier({ ...editedTier, name: e.target.value })
                    }
                    style={{ padding: "4px" }}
                  />
                ) : (
                  tier.name
                )}
              </td>
              <td style={{ padding: "8px" }}>
                {editingTierId === tier.id ? (
                  <input
                    value={editedTier.benefits}
                    onChange={(e) =>
                      setEditedTier({
                        ...editedTier,
                        benefits: e.target.value,
                      })
                    }
                    style={{ padding: "4px" }}
                  />
                ) : (
                  tier.benefits
                )}
              </td>
              <td style={{ padding: "8px" }}>
                {editingTierId === tier.id ? (
                  <button
                    onClick={handleSaveEdit}
                    style={{
                      padding: "0.3rem 0.6rem",
                      marginRight: "0.5rem",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(tier)}
                    style={{
                      padding: "0.3rem 0.6rem",
                      marginRight: "0.5rem",
                      backgroundColor: "#ffc107",
                      color: "black",
                      border: "none",
                      borderRadius: 4,
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(tier.id)}
                  style={{
                    padding: "0.3rem 0.6rem",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}