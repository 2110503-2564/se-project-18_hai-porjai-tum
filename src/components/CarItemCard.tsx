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
        <div className="relative w-[13vw] h-[30vh] my-2 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-2xl shadow-lg border-2 border-yellow-500 p-3 flex flex-col justify-between">
          
          {/* Ticket Ribbon */}
          <div className="absolute -top-1/2% left-1/2 -translate-x-1/2 bg-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow-md z-10">
             {car.model}
          </div>
      
          {/* Image */}
          <div className="rounded-xl overflow-hidden shadow-md mt-6">
            <Image
              src={car.picture}
              alt={car.model}
              width={220}
              height={150}
              className="object-cover w-full h-[140px] transition-transform duration-300 hover:scale-105"
            />
          </div>
      
          {/* Action Buttons */}
          <div className="mt-3 flex justify-center space-x-2">
            <button
              onClick={() => handleClick(`/manage/cars?id=${car.id}&name=${car.name}&model=${car.model}&tel=${car.tel}&pic=${car.picture}&rate=${car.pricePerDay}&tier=${car.tier}`)}
              className="bg-yellow-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full text-sm shadow-md transition"
            >
              ✏️ Edit
            </button>
      
            <button
              onClick={() => startTransition(() => removeCar(car.id))}
              disabled={isPending}
              className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm shadow-md transition"
            >
              {isPending ? '⏳' : '🗑'} {isPending ? 'Removing...' : 'Remove'}
            </button>
          </div>
        </div>
      );
      
}