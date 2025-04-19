import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import CarItemCard from './CarItemCard'; // Import Client Component

export default async function RentalMenu({ carsJson }: { carsJson: Promise<CarJson> }) {
    const carsJsonReady = await carsJson;

    return (
        <div className="w-[250px] text-black bg-white rounded-[10px] border border-silver p-[10px] m-[5px]">
            <h3>All {carsJsonReady.count} Cars</h3>
            {carsJsonReady.data.map((CarItem: CarItem) => (
                <CarItemCard key={CarItem.model} car={CarItem} />
            ))}
        </div>
    );
}