'use client'
import styles from './banner.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function Banner() {
    const covers = ['/img/tinderbg.png', '/img/tinderbg.png', '/img/tinderbg.png', '/img/tinderbg.png']
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
}
