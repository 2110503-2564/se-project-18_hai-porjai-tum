import getCars from "@/libs/getCars";
import CarCatalog from "@/components/CarCatalog";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function Car({ searchParams }: { searchParams?: { query?: string } }) {
    const carsJson = await getCars();
    const search = searchParams?.query?.toLowerCase() || "";

    const filteredCars = carsJson.data.filter((car: any) =>
        car.name.toLowerCase().includes(search)
    );

    const filteredResult: CarJson = {
        success: true,
        count: filteredCars.length,
        data: filteredCars
    };

    return (
        <main className="relative w-full min-h-screen bg-[url('/img/tinderbg.png')] bg-cover bg-center py-8 px-4">
            <div className="max-w-3xl mx-auto mb-6">
                <form>
                    <input
                        type="text"
                        name="query"
                        placeholder="Type.. something ex. carname"
                        defaultValue={searchParams?.query || ""}
                        className="w-full px-4 py-2 rounded-lg shadow bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </form>
            </div>

            <Suspense fallback={<LinearProgress />}>
                <CarCatalog carsJson={Promise.resolve(filteredResult)} />
            </Suspense>

            <Footer />
        </main>
    );
}
