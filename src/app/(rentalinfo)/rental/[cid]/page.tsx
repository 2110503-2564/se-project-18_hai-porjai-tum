import Image from "next/image"
import getCar from "@/libs/getCar"
import Link from "next/link"
export default async function CarDetailPage({ params }: { params: { vid: string } }) {
    // Mock Data for Demonstration Only
    // const mockVenueRepo = new Map()
    // mockVenueRepo.set("001", { name: "The Bloom Pavilion", image: "/img/bloom.jpg" })
    // mockVenueRepo.set("002", { name: "Spark Space", image: "/img/sparkspace.jpg" })
    // mockVenueRepo.set("003", { name: "The Grand Table", image: "/img/grandtable.jpg" })
    const CarDetail = await getCar(params.vid)
    return (
        <main className="text-center p-14">
            <h1 className="text-2xl font-medium">{CarDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={CarDetail.data.picture}
                    alt='Product Picture'
                    width={0} height={0} sizes="100vw"
                    className='rounded-lg w-[30%] bg-black' />
                <div className="text-md mx-5 text-left">Name: {CarDetail.data.name}
                    <div>Address: {CarDetail.data.address} </div>
                    <div>District: {CarDetail.data.district}</div>
                    <div>Province: {CarDetail.data.province}</div>
                    <div>Postal Code: {CarDetail.data.postalcode}</div>
                    <div>Tel: {CarDetail.data.tel}</div>
                    <div>Daily Rate: {CarDetail.data.dailyrate}</div>
                    <Link href={`/booking?id=${params.vid}&model=${CarDetail.data.name}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1
                    text-white shadow-sm">
                            Booking
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
