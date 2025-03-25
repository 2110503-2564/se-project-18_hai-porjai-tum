import Image from 'next/image'
import TopMenuItem from './TopMenuItem'
import { getServerSession } from 'next-auth'
import { Link } from '@mui/material'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

export default async function TopMenu() {
    const session = await getServerSession(authOptions)
    return (
        <div className="h-[50px] bg-white fixed top-0 right-0 z-30 border-t border-b 
        border-light-gray flex flex-row-reverse items-center justify-end w-full ">
                <Link href="/">
                <Image src={'/img/logo.png'} className="h-full w-auto" alt='logo' width={40} height={40} />
                </Link>
            <div className="flex items-center ml-auto">
                {session ? <TopMenuItem title={session.user.role === "admin" ? 'Rentals' : 'My Rentals'} pageRef='/myrental' /> : null}
                <TopMenuItem title='Select Car' pageRef='/car' />
            </div>
            <div className="flex flex-row absolute left-0 h-full">
                {
                    session ? <Link href="/api/auth/signout"><div className='text-cyan-600 flex items-center h-full px-2 text-sm'>Sign-Out</div></Link>
                        : <Link href="/api/auth/signin"><div className='text-cyan-600 flex items-center h-full px-2 text-sm'>Sign-In</div></Link>
                }
                <TopMenuItem title='Cart' pageRef='/mycart' />
            </div>
        </div>
    )
}
