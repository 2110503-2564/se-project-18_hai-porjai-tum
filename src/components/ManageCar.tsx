import { getServerSession } from 'next-auth'
import getUserProfile from '@/libs/getUserProfile'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import addCar from '@/actions/addCar'
import editCar from '@/actions/editCar'

export default async function ManageCar({ id, name, model, tel, pic, rate, tier }: { id?: string, name?: string, model?: string, tel?: string, pic?: string, rate?: string, tier?: string }) {

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    return (
        <main className="bg-gradient-to-br from-slate-100 to-slate-200 m-5 p-6 rounded-xl shadow-lg max-w-4xl mx-auto h-full">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-orange-600 mb-2">{profile.data.name}</h1>
                <table className="table-auto border-separate border-spacing-2 text-gray-700 text-sm">
                    <tbody>
                        <tr><td className="font-semibold pr-4">📧 Email:</td><td>{profile.data.email}</td></tr>
                        <tr><td className="font-semibold pr-4">📞 Tel:</td><td>{profile.data.tel}</td></tr>
                        <tr><td className="font-semibold pr-4">📆 Member Since:</td><td>{createdAt.toDateString()}</td></tr>
                    </tbody>
                </table>
            </div>

            {
                (profile.data.role === "admin") ? (
                    <form
                        action={id && name && model && tel && pic && rate && tier ? editCar : addCar}
                        className="bg-white border border-orange-400 rounded-2xl shadow-lg p-6 space-y-4"
                    >
                        <h2 className="text-2xl font-semibold text-red-600 mb-4">{id ? "✏️ Edit Car" : "🚘 Add New Car"}</h2>

                        {id && (
                            <div className="flex flex-col">
                                <label htmlFor="id" className="text-sm text-gray-600">Car ID</label>
                                <input
                                    type="text" id="id" name="id" readOnly value={id}
                                    className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-gray-800"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="name" className="text-sm text-gray-600">Name</label>
                                <input
                                    type="text" id="name" name="name" required defaultValue={name || ""}
                                    placeholder="Car Name"
                                    className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-800"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="model" className="text-sm text-gray-600">Model</label>
                                <input
                                    type="text" id="model" name="model" required defaultValue={model || ""}
                                    placeholder="Car Model"
                                    className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-800"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="tel" className="text-sm text-gray-600">Telephone</label>
                                <input
                                    type="text" id="tel" name="tel" required defaultValue={tel || ""}
                                    placeholder="Car Telephone"
                                    className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-800"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="picture" className="text-sm text-gray-600">Picture URL</label>
                                <input
                                    type="text" id="picture" name="picture" required defaultValue={pic || ""}
                                    placeholder="Image URL"
                                    className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-800"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="dayRate" className="text-sm text-gray-600">Price Rate</label>
                                <input
                                    type="text" id="dayRate" name="dayRate" required defaultValue={rate || ""}
                                    placeholder="Daily Rate"
                                    className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-800"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="tier" className="text-sm text-gray-600">Tier</label>
                                <select
                                    id="tier" name="tier" required
                                    className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-800"
                                >
                                    <option value="Bronze" selected={tier === "Bronze"}>Bronze</option>
                                    <option value="Silver" selected={tier === "Silver"}>Silver</option>
                                    <option value="Gold" selected={tier === "Gold"}>Gold</option>
                                    <option value="Ruby" selected={tier === "Ruby"}>Ruby</option>
                                    <option value="Diamond" selected={tier === "Diamond"}>Diamond</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-red-500 hover:bg-orange-700 text-white font-medium px-5 py-2 rounded-lg transition"
                        >
                            {id ? "Update Car" : "Add New Car"}
                        </button>
                    </form>
                ) : (
                    <div className="text-gray-600 italic text-center mt-6">You do not have admin access.</div>
                )
            }
        </main>

    )
}