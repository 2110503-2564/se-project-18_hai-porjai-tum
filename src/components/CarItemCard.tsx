'use client';

import { useTransition } from 'react';
import Image from 'next/image';
import removeCar from '@/actions/removeCar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CarItemCard({ car }: { car: CarItem }) {
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const handleClick = async (title:string) => {
        // Wait for route change before do anything
        await router.push(title);
        // Reload after routing
        router.refresh;
      } 

    return (
        <div key={car.model} className='py-2 w-[200px] h-[200px]'>
            <div className='relative z-20 text-center text-white bg-black rounded-t-lg'>{car.model}</div>
            <Image 
                src={car.picture}
                alt={car.model}
                width={300}
                height={300}
                className='rounded-lg h-[100%] w-[100%] object-cover mt-[-25px]' 
            />
            <div className='justify-self-center z-20 mt-[-35px]'>
                {/* <Link href={}> */}
                <button onClick={() => handleClick(`/car/manage?id=${car.id}&name=${car.name}&model=${car.model}&tel=${car.tel}&pic=${car.picture}&rate=${car.pricePerDay}&tier=${car.tier}`)} className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-indigo-700 transition mx-1">
                    Edit
                </button>
                {/* </Link> */}
                <button
                    onClick={() => startTransition(() => removeCar(car.id))}
                    disabled={isPending}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition mx-1"
                >
                    {isPending ? 'Removing...' : 'Remove'}
                </button>
            </div>
        </div>
    );
}