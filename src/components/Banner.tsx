'use client'
<<<<<<< HEAD
import styles from './banner.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function Banner() {
    const covers = ['/img/Component.png', '/img/Component.png', '/img/Component.png', '/img/Component.png']
    const [index, setIndex] = useState(0)
    const [hover, setHover] = useState(false);
    const router = useRouter()
    const { data: session } = useSession()
    // console.log(session?.user.role)

    const cars = [
        { name: "SEDAN", image: "/img/SEDAN.png", textImage: "/img/SEDAN(1).png", price: "2564 Free" },
        { name: "SUV", image: "/img/SUV.png", textImage: "/img/SUV(1).png", price: "1088 Free" },
        { name: "HATCHBACK", image: "/img/HATCHBACK.png", textImage: "/img/HATCHBACK(1).png", price: "942 Free" },
        { name: "PICK UP", image: "/img/PickUp.png", textImage: "/img/PICK UP.png", price: "316 Free" },
    ];

    return (
        <div className={styles.banner} onClick={() => setIndex(index + 1)}>

             
            <Image 
                src={covers[index % 4]}
                alt="Main"
                fill={true}
                className="object-cover"
                priority
            />
            {session && (
                <div className="z-30 absolute top-5 right-5 font-semibold text-black text-xl">
                     <Image src="/img/sign.png" alt="Fire Icon" width={20} height={20} />
                    
                </div>
            )}

            {/* Display Cards */}
            <motion.div 
                className="absolute top-[20%] left-[11%] flex gap-32"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                {cars.map((car, i) => (
                    <motion.div 
                        key={i} 
                        className="relative bg-gray-800 p-4 rounded-lg shadow-lg text-center w-56 h-96 flex  justify-center overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        {/* Car Image with Text Image Beside */}
                        <div className="relative flex ">
                           
                            {/* Car Image */}
                            <Image 
                                src={car.image} 
                                alt={car.name} 
                                layout="intrinsic" 
                                width={180} 
                                height={240} 
                                className="object-contain z-10"
                            />
                             {/* Text Image */}
                             <Image 
                                src={car.textImage} 
                                alt={`${car.name} Text`}
                                layout="intrinsic" 
                                width={30} 
                                height={80} 
                                className="top-[4%] absolute left-1 object-contain z-0"
                            />
                        </div>

                        {/* Pricing Box */}
                        <div className="absolute bottom-4 bg-white px-4 py-2 text-black font-bold text-lg flex items-center gap-2 rounded-lg">
                            {car.price} 
                            <Image src="/img/tinder.png" alt="Fire Icon" width={20} height={20} />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
             {/* New Image Component */}
        <div className="absolute top-10 left-10">
        <Image 
            src="/img/Mobile.png"
            alt="Additional Component" 
            width={120} 
            height={120} 
            className="top-40 object-contain z-30"
        />
           </div>

            {/* Call to Action */}
            <motion.div 
                className="z-30 absolute bottom-10 right-10 cursor-pointer flex items-center gap-4"
                initial={{ x: 0 }}
                whileHover={{ x: -20 }}
                transition={{ type: 'tween', duration: 0.5, ease: 'easeOut' }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); router.push('/car') }}
            >
                <motion.div 
                    animate={hover ? { rotate: [0, -5, 5, -5, 5, 0] } : {}} 
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
                >
                    <Image 
                        src="/img/car-icon.png" 
                        alt="Explore Cars"
                        width={160} 
                        height={120} 
                        priority
                    />
                </motion.div>
                
                <motion.span 
                    className="text-white text-3xl font-bold drop-shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hover ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    Get Start
                </motion.span>
            </motion.div>
        </div>
    );
=======

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
          onClick={() => router.push('/home')} 
          className="mt-4 px-6 py-3 bg-red-600 text-white rounded-full shadow hover:bg-orange-800 transition"
        >
          Ready
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
>>>>>>> d3db22c155123064ed0ed8467211e3e255492ed6
}
