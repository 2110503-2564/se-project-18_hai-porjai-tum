import { getServerSession } from 'next-auth'
import getUserProfile from '@/libs/getUserProfile'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import addCar from '@/actions/addCar'
import editCar from '@/actions/editCar'

<<<<<<< HEAD
export default async function DashboardPage({id, name, model, tel, pic, rate} : {id?:string, name?:string, model?:string, tel?:string, pic?:string, rate?:string}) {

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    return (
        <main className="bg-slate-100 m-5 p-5">
            <div className='text-2xl'>{profile.data.name}</div>
            <table className='table-auto border-separate border-spacing-2'><tbody>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
            </tbody></table>

            {
                (profile.data.role=="admin")?
                <form 
                action={
                    id && name && model && tel && pic && rate ? editCar : 
                    addCar}
                >
                    <div className='text-xl text-blue-700'>Create Car Model {id}</div>
                    {id ? <div className='flex items-center w-1/2 my-2'>
                        <label className='w-auto block text-gray-700 pr-4' htmlFor='model'>
                            ID</label>
                        <input type='text' required id="id" name="id" placeholder='ID' 
                        value={id} readOnly 
                        className='bg-white border-2 border-gray-200 rounded w-full p-2 
                        text-gray-700 focus:outline-none focus:border-blue-400'/>
                    </div>: null}
                    <div className='flex items-center w-1/2 my-2'>
                        <label className='w-auto block text-gray-700 pr-4' htmlFor='model'>
                            Name</label>
                        <input type='text' required id="name" name="name" placeholder='Car Name' 
                        defaultValue={name ? name : ""}
                        className='bg-white border-2 border-gray-200 rounded w-full p-2 
                        text-gray-700 focus:outline-none focus:border-blue-400'/>
                    </div>
                    <div className='flex items-center w-1/2 my-2'>
                        <label className='w-auto block text-gray-700 pr-4' htmlFor='model'>
                            Model</label>
                        <input type='text' required id="model" name="model" placeholder='Car Model' 
                        defaultValue={model ? model : ""}
                        className='bg-white border-2 border-gray-200 rounded w-full p-2 
                        text-gray-700 focus:outline-none focus:border-blue-400'/>
                    </div>
                    <div className='flex items-center w-1/2 my-2'>
                        <label className='w-auto block text-gray-700 pr-4' htmlFor='desc'>
                            Telephone</label>
                        <input type='text' required id="tel" name="tel" placeholder='Car Telephone'
                        defaultValue={tel ? tel : ""}
                        className='bg-white border-2 border-gray-200 rounded w-full p-2 
                        text-gray-700 focus:outline-none focus:border-blue-400'/>
                    </div>
                    <div className='flex items-center w-1/2 my-2'>
                        <label className='w-auto block text-gray-700 pr-4' htmlFor='picture'>
                            Picture</label>
                        <input type='text' required id="picture" name="picture" placeholder='URL' 
                        defaultValue={pic ? pic : ""}
                        className='bg-white border-2 border-gray-200 rounded w-full p-2 
                        text-gray-700 focus:outline-none focus:border-blue-400'/>
                    </div>
                    <div className='flex items-center w-1/2 my-2'>
                        <label className='w-auto block text-gray-700 pr-4' htmlFor='dayRate'>
                            Price Rate</label>
                        <input type='text' required id="dayRate" name="dayRate" 
                        placeholder='Daily Rate (including insurance)' 
                        defaultValue={rate ? rate : ""}
                        className='bg-white border-2 border-gray-200 rounded w-full p-2 
                        text-gray-700 focus:outline-none focus:border-blue-400'/>
                    </div>
                    <button type="submit" className='bg-blue-500 hover:bg-blue-700 
                    text-white p-2 rounded'>{id ? "Update" : "Add New"} Car</button>
                </form>
                : <div>There nothing to do with this</div>
            }

        </main>
    )
=======
export default async function DashboardPage({ id, name, model, tel, pic, rate, tier }: { id?: string, name?: string, model?: string, tel?: string, pic?: string, rate?: string, tier?: string }) {

  const session = await getServerSession(authOptions)
  if (!session || !session.user.token) return null

  const profile = await getUserProfile(session.user.token)
  var createdAt = new Date(profile.data.createdAt)

  return (
    <main className="bg-gradient-to-br from-slate-100 to-slate-200 m-5 p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
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
>>>>>>> d3db22c155123064ed0ed8467211e3e255492ed6
}