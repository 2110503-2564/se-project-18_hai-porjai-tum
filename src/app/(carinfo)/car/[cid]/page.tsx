import Image from "next/image"
import getCar from "@/libs/getCar"
import Link from "next/link"
export default async function CarDetailPage({ params }: { params: { cid: string } }) {
    // Mock Data for Demonstration Only
    // const mockVenueRepo = new Map()
    // mockVenueRepo.set("001", { name: "The Bloom Pavilion", image: "/img/bloom.jpg" })
    // mockVenueRepo.set("002", { name: "Spark Space", image: "/img/sparkspace.jpg" })
    // mockVenueRepo.set("003", { name: "The Grand Table", image: "/img/grandtable.jpg" })
    const CarDetail = await getCar(params.cid)
    return (
        <main className="text-center p-14">
            <h1 className="text-2xl font-medium">{CarDetail.data.carId}</h1>
            <div className="flex flex-row my-5">
                <Image src={CarDetail.data.picture}
                    alt='Product Picture'
                    width={0} height={0} sizes="100vw"
                    className='rounded-lg w-[30%] bg-black' />
                <div className="text-md mx-5 text-left">Name: {CarDetail.data.name}
                    <div>Model: {CarDetail.data.model} </div>
                    <div>Tel: {CarDetail.data.tel}</div>
                    <div>Price / Day: {CarDetail.data.pricePerDay}</div>
                    
                    <Link href={`/rental?id=${params.cid}&model=${CarDetail.data.model}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 mt-5
                    text-white shadow-sm">
                            Rental
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
