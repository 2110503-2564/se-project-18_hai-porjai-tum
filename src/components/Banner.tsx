'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

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

  return (
    <section className="w-full h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-16 bg-[url('/img/tinderbg.png')] bg-cover bg-center brightness-60">
      {/* Text Section (Left) */}
      <div className="flex-1 text-center md:text-left max-w-xl space-y-6 mt-24 md:mt-0">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Discover the joy of 
          <span className="bg-white text-red-600 px-2 rounded mx-2">Thai</span>
          car exploring
          <br />
          <span className="bg-white text-red-400 px-2 rounded">with Carinder.</span>
        </h1>
        <p className="text-white text-base md:text-lg">
          Your personalized car recommendation experience starts here. Swipe, explore, and find your perfect match.
        </p>
        <button 
          onClick={() => router.push('/car')} 
          className="mt-4 px-6 py-3 bg-red-600 text-white rounded-full shadow hover:bg-orange-800 transition"
        >
          Explore Catalog
        </button>
      </div>

{/* Card Stack (Right side, top card straight, fanned to the left) */}
<div className="relative w-[360px] h-[520px] flex-1 flex items-center justify-center">
  {visibleCars
    .slice(0)
    .reverse() // Important: reverse so top card is rendered last (highest zIndex)
    .map((car, i) => {
      const offset = (visibleCars.length - 1 - i);
      return (
        <div
          key={index + i}
          className={`absolute w-[320px] h-[500px] rounded-3xl overflow-hidden shadow-xl transition-all duration-300`}
          style={{
            left: `${offset * 10 + 200}px`, // shift stack slightly to the left
            top: `${offset * 6}px`,
            transform: `rotate(${-offset * 3}deg)`,
            zIndex: i + 1,
          }}
        >
          <Image
            src={car.picture}
            alt={car.name}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {car.name} <span className="text-blue-400">✔</span>
            </h2>
            <p className="text-sm text-gray-300">recently active</p>
          </div>
        </div>
      )
    })}

  {/* Tinder-style Buttons below stack */}
  <div className="absolute bottom-[-90px] flex items-center justify-center gap-4">
    <button className="bg-yellow-400 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md">
      ⟳
    </button>
    <button className="bg-red-500 text-white w-14 h-14 rounded-full text-xl flex items-center justify-center shadow-md">
      ✖
    </button>
    <button className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md">
      ⭐
    </button>
    <button
      onClick={handleLike}
      className="bg-green-500 text-white w-14 h-14 rounded-full text-xl flex items-center justify-center shadow-md hover:scale-110 transition"
    >
      ❤
    </button>
    <button className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md">
      ⚡
    </button>
  </div>
</div>

    </section>
  )
}
