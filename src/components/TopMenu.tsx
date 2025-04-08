import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { Link } from '@mui/material';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import getUserProfile from '@/libs/getUserProfile';

export default async function TopMenu() {
    const session = await getServerSession(authOptions);
    // const response :UserJson =  session ?   await getUserProfile(session.user.token) : null ;




    return (
        <div
            className="h-[60px] bg-gray-900 fixed top-0 right-0 z-50 border-b border-gray-700 
            flex items-center  w-full px-4 font-poppins text-white"
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
                <li className="cursor-pointer hover:text-gray-400 px-14">Rental</li>
                <li className="cursor-pointer flex items-center gap-1 hover:text-gray-400 ">
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

            <div className="flex items-center gap-6 ml-auto  text-white">
                {session && session.user ? (
                    <>
                        <TopMenuItem title="Cart" pageRef="/mycart" />
                        <TopMenuItem
                            title={session.user.role === 'admin' ? 'Rentals' : 'My Rentals'}
                            pageRef="/myrental"
                        />
                        {session.user.role === 'admin' && (
                            <TopMenuItem
                                title="Manage Cars"
                                pageRef="/car/manage"
                            />
                        )}
                        <Link href="/api/auth/signout">
                            <div className="cursor-pointer hover:text-gray-400 text-white">Sign-Out</div>
                        </Link>
                        <Link href="/profile">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={"/img/log in2.png"}
                                    alt="User Profile Picture"
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                />
                                <span>{session.user.name || "User"}</span>
                            </div>
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

            </div>
        </div>
    );
}
