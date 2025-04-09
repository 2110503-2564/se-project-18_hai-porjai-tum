import Image from "next/image";
import getCar from "@/libs/getCar";
import getCars from "@/libs/getCars"; // Assuming this fetches the catalog data
import Link from "next/link";
import Card from "@/components/Card";

function getReviewSentiment(rating: number): string {
    if (rating > 3) return "Mostly Positive";
    if (rating >= 2) return "Mixed";
    if (rating == null) return "No Review";
    return "Mostly Negative";
}

function getProgressBarColor(rating: number): string {
    if (rating > 3) return "bg-red-500"; // Positive
    if (rating >= 2) return "bg-yellow-500"; // Mixed
    if (rating == null) return "bg-white-500";
    return "bg-green-500"; // Negative
}

export default async function CarDetailPage({ params }: { params: { cid: string } }) {
    const CarDetail = await getCar(params.cid);
    const Catalog = await getCars(); // Fetch other cars from the catalog

    return (
        <main className="relative w-full min-h-screen bg-gray-800 flex justify-center items-center">
            {/* Car Details Card */}
            <div className="relative bg-gray-100 rounded-lg shadow-lg w-[90%] sm:w-[60%] md:w-[40%] p-5">
                {/* Car Image */}
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <Image
                        src={CarDetail.data.picture}
                        alt="Product Picture"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                    />
                </div>

                {/* Car Details */}
                <div className="p-4 text-left text-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900">{CarDetail.data.name}</h2>
                    <p className="text-sm text-gray-600 italic mb-4">{CarDetail.data.model}</p>

                    {/* Specifications */}
                    <div className="space-y-2">
                        <p className="text-lg">
                            <span className="font-semibold">Tel:</span> {CarDetail.data.tel}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold">Price / Day:</span> {CarDetail.data.pricePerDay}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold">Tier:</span> {CarDetail.data.tier}
                        </p>
                    </div>

                    {/* Rating Section */}
                    <div className="mt-5">
                        <h3 className="font-bold text-lg text-gray-900">Rating</h3>
                        <div className="flex items-center mt-2">
                            <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden mr-4">
                                <div
                                    className={`${getProgressBarColor(CarDetail.data.rating)} h-full`}
                                    style={{ width: `${(CarDetail.data.rating / 5) * 100}%` }}
                                />
                            </div>
                            <span className="text-sm text-gray-900 font-medium">
                                {CarDetail.data.rating}/5
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 italic mt-2">
                            {getReviewSentiment(CarDetail.data.rating)}
                        </p>
                    </div>

                    {/* Rental Button */}
                    <Link href={`/rental?id=${params.cid}&model=${CarDetail.data.model}`}>
                        <button className="block w-full mt-5 py-2 bg-red-600 text-white rounded-lg shadow-lg text-center text-lg font-semibold hover:bg-orange-600 transition-all duration-300">
                            Rent This Car
                        </button>
                    </Link>
                </div>
            </div>



            {/* Catalog Section */}
            <div className="p-10 bg-gray-300 rounded-t-lg">
                <h2 className="text-xl font-bold text-gray-700">Other Cars in the Catalog</h2>
                <div className="flex flex-wrap justify-around mt-5">
                    {/* Display Only 4 Cards */}
                    {Catalog.data.slice(0, 4).map((CarItem: CarItem) => (
                        <Link
                            key={CarItem.id}
                            href={`/car/${CarItem.id}`}
                            className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] h-[100%] p-2 sm:p-4 md:p-4 lg:p-8"
                        >
                            <Card carName={CarItem.model} imgSrc={CarItem.picture} rating={CarItem.rating} />
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
