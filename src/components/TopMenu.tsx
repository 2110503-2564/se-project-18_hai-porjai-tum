import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { Link } from '@mui/material';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function TopMenu() {
    const session = await getServerSession(authOptions);

    return (
        <div
            className="h-[60px] bg-gray-900 fixed top-0 right-0 z-50 border-b border-gray-700 
            flex items-center justify-between w-full px-4 font-poppins text-white"
        >
            {/* Left Section: Logo */}
            <Link href="/" className="flex items-center">
                <Image 
                    src="/img/carlogo.png" 
                    alt="logo" 
                    width={30} 
                    height={30} 
                    className="h-full w-auto"
                />
                {/* <span className="ml-2 text-lg font-bold text-white">Rental</span> */}
            </Link>

            {/* Center Section: Menu Items */}
            <ul className="flex items-center gap-8">
                <li className="cursor-pointer hover:text-gray-400">Rental</li>
                <li className="cursor-pointer flex items-center gap-1 hover:text-gray-400">
                    Select Car
                    <Image 
                        src="/img/orig.png" 
                        alt="Dropdown Icon" 
                        width={12} 
                        height={12}
                    />
                </li>
                <li className="cursor-pointer hover:text-gray-400">About us</li>
            </ul>

            {/* Right Section: User Actions */}
            <div className="flex items-center gap-6">
                {session ? (
                    <>
                        <TopMenuItem
                            title={session.user.role === 'admin' ? 'Rentals' : 'My Rentals'}
                            pageRef="/myrental"
                        />
                        <Link href="/api/auth/signout">
                            <div className="cursor-pointer hover:text-gray-400 text-white">Sign-Out</div>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/api/auth/signin">
                            <div className="cursor-pointer hover:text-gray-400 text-white">Sign-In</div>
                        </Link>
                        <Link href="/register">
                            <div className="cursor-pointer hover:text-gray-400 text-white">Register</div>
                        </Link>
                    </>
                )}
                <TopMenuItem title="Cart" pageRef="/mycart" />
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-400">
                    <span>User</span>
                    <Image 
                        src="/img/orig.png" 
                        alt="Dropdown Icon" 
                        width={12} 
                        height={12}
                    />
                </div>
            </div>
        </div>
    );
}
