'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState,useEffect } from 'react'


export default function Banner({ cars }: { cars: CarItem[] }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [index, setIndex] = useState(0)
  

  const visibleCars = cars.slice(index, index + 5)

  const handleLike = () => {
    if (index < cars.length - 1) {
      setIndex(prev => prev + 1)
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % cars.length)
    }, 3000) // Change the slide every 3 seconds

    // Clear the interval when component unmounts
    return () => clearInterval(interval)
  }, [cars.length])

  return (
    <section className="relative w-full h-screen text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/tinderbg.png"
          alt="Banner Background"
          fill
          className="object-cover brightness-50"
        />
        {/* Netflix-style bottom fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-start px-8 md:px-20 pt-10">
        {/* Text */}
        <div className="text-center max-w-2xl mt-8">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Newly added with
            <span className="text-red-500 bg-white px-2 py-1 rounded-l">Promotions</span> 
            <br />
            <span className="text-red-300"> below.</span>
          </h1>
        
          <button
            onClick={() => router.push('/car')}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 transition rounded-md font-semibold text-white text-lg shadow-lg"
          >
           Car Catalog
          </button>
        </div>

        {/* Car Display */}
        <div className="relative w-full h-[320px] flex items-center justify-start overflow-x-auto space-x-6 mt-10">
          {visibleCars.map((car, i) => (
            <div
              key={car.id}
              className="w-[320px] h-[320px] rounded-lg overflow-hidden shadow-2xl transition-all duration-300"
            >
              <Image src={car.picture} alt={car.name} width={320} height={320} className="object-cover" />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {car.name} <span className="text-red-400">✔</span>
                </h2>
                <p className="text-sm text-gray-300">recently added</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination buttons */}
        <div className="mt-6">
          <button
            onClick={() => setIndex(prev => Math.max(prev - 1, 0))}
            className="px-6 py-3 bg-red-600 hover:bg-white text-white rounded-md mr-4"
          >
            Previous
          </button>
          <button
            onClick={() => setIndex(prev => Math.min(prev + 1, cars.length - 5))}
            className="px-6 py-3 bg-orange-600 hover:bg-white text-white rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}
