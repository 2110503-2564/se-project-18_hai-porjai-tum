import { getServerSession } from 'next-auth'
import getUserProfile from '@/libs/getUserProfile'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import addCar from '@/actions/addCar'
import editCar from '@/actions/editCar'

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
}