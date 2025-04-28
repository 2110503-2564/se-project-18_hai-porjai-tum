"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import getAllUsers from "@/libs/getAllUser";
import setUserPayment from "@/libs/setUserPayment";
import { getTier, getTierStyle } from "@/app/profile/page";

export default function ManageUserPage({ token }: { token: string }) {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedPayment, setEditedPayment] = useState<number>(0);
  const [profile, setProfile] = useState<any>(null);

  const [editedTier, setEditedTier] = useState<string>("Bronze");
  const [isTierManuallyEdited, setIsTierManuallyEdited] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers(token);
        setUsers(usersData);
      } catch (err: any) {
        setError(err.message || "Failed to load users");
      }
    };

    fetchUsers();
  }, [token]);

  const handleEditClick = (user: any) => {
    setEditingUserId(user._id);
    setEditedPayment(user.payment);
    const currentTier = getTier(user.payment);
    setEditedTier(currentTier);
    setIsTierManuallyEdited(false);
  };

  const handleSavePayment = (userId: string) => {
    // หา index ผู้ใช้
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        return {
          ...user,
          payment: editedPayment,
          tier: isTierManuallyEdited ? editedTier : getTier(editedPayment), 
        };
      }
      return user;
    });
  
    setUsers(updatedUsers); 
    setEditingUserId(null); 
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">
        👥 All Users
      </h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 shadow-lg rounded-lg overflow-hidden bg-white">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Tier</th>

              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Payment</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const userTier = user.tier || getTier(user.payment); 
              const tierStyle = getTierStyle(userTier);

              return (
                <tr
                  key={user._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>

                  <td className="px-4 py-2" style={tierStyle}>
                    {userTier}
                  </td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    {editingUserId === user._id ? (
                      <>
                        <select
                          value={editedTier}
                          onChange={(e) => {
                            setEditedTier(e.target.value);
                            setIsTierManuallyEdited(true);
                          }}
                          className="border px-2 py-1 w-32 rounded"
                        >
                          <option value="Bronze">Bronze</option>
                          <option value="Silver">Silver</option>
                          <option value="Gold">Gold</option>
                          <option value="Ruby">Ruby</option>
                          <option value="Diamond">Diamond</option>
                        </select>

                       
                        <input
                          type="number"
                          value={editedPayment}
                          onChange={(e) =>
                            setEditedPayment(parseFloat(e.target.value))
                          }
                          className="border px-2 py-1 w-24 rounded"
                        />

                        <button
                          onClick={() => handleSavePayment(user._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        {user.payment}
                        <button onClick={() => handleEditClick(user)}>
                          <Pencil
                            size={16}
                            className="text-gray-500 hover:text-orange-500"
                          />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
