'use client'

import { useEffect, useState } from 'react'
import getAllUsers from '@/libs/getAllUser'

export default function ManageUserPage({ token }: { token: string }) {
    const [users, setUsers] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        console.log("Token: ", token)
        const fetchUsers = async () => {
            try {
                const usersData = await getAllUsers(token)
                setUsers(usersData)
            } catch (err: any) {
                setError(err.message || 'Failed to load users')
            }
        }

        fetchUsers()
    }, [token])

    return (
        <section className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">👥 All Users</h2>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-300 shadow-lg rounded-lg overflow-hidden bg-white">
                    <thead className="bg-gray-100 text-sm text-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Tel</th>
                            <th className="px-4 py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.tel}</td>
                                <td className="px-4 py-2 capitalize">{user.role}</td>
                                <td className="px-4 py-2">{user.payment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
