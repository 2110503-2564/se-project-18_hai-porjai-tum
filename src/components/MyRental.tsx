"use client"
import deleteRental from "@/libs/deleteRental";
import getRentals from "@/libs/getRentals";
import getUserProfile from "@/libs/getUserProfile";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyRental() {

    const { data: session } = useSession()

    const [rentalsJson, setRentalJson] = useState<RentalJson | null>(null);
    const [userJson, setUserJson] = useState<UserJson | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const response = session ? await getRentals(session.user.token) : null
        const profile = session ? await getUserProfile(session.user.token) : null
        setUserJson(profile);
        setRentalJson(response);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteRequest = async (rentalItem: RentalItem) => {
        if (session && session.user.token && rentalItem._id)
            try {
                const response = await deleteRental(rentalItem._id, session.user.token)
                if (response.success) fetchData()
            } catch (error) {
                alert("fail")
                console.log("Failed to delete data")
            }
    }


    return (
        <div className="p-5">{loading ? <p>Loading...</p> : rentalsJson ?
            rentalsJson.data.map((rentalItem: RentalItem) => (
                <div className="flex gap-4 m-2">{
                    rentalItem.car ? <div className="relative w-[20%]">
                        <Image src={rentalItem.car.picture}
                            alt={rentalItem.car.name}
                            fill={true}
                            className='object-cover rounded-lg'
                        />
                    </div> : null}
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 flex justify-between items-center w-full">
                        <div>
                            {userJson?.data.role === "admin" ? <div>User Id: {rentalItem.user}</div> : null}
                            <div>Model: {rentalItem.car?.model}</div>
                            <div className="text-md">Number Of Days: {dayjs(rentalItem.returnDate).diff(dayjs(rentalItem.pickupDate), "day")}</div>
                            <div className="text-md">Assume Price: {rentalItem.assumePrice}</div>
                            <div className="text-md">Pickup Location: {rentalItem.pickupLocation}</div>
                            <div className="text-md">Pickup Date: {rentalItem.pickupDate}</div>
                            <div className="text-md">Return Location: {rentalItem.returnLocation}</div>
                            <div className="text-md">Return Date: {rentalItem.returnDate}</div>

                        </div>
                        <div>
                            <Link href={`/rental/manage?id=${rentalItem._id}`}>
                                <button
                                    className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-indigo-700 transition mx-1">
                                    edit
                                </button>
                            </Link>
                            <button
                                onClick={() => handleDeleteRequest(rentalItem)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition mx-1">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )) :
            <div> There is no rental</div>
        }</div>
    )
}