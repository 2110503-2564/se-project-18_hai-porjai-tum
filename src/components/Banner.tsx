'use client'
import styles from './banner.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function Banner() {
    const covers = ['/img/cover2.jpg', '/img/cover3.png', '/img/cover2.jpg', '/img/cover4.png']
    const [index, setIndex] = useState(0)
    const router = useRouter()
    const { data: session } = useSession()

    return (
        <div className={styles.banner} onClick={() => setIndex(index + 1)}>
            <Image src={covers[index % 4]}
                alt='Main'
                fill={true}
                objectFit='cover'
                priority
            />
            <div className={styles.bannerText}>
                <h1 className="text-8xl font-bold tracking-wide text-transparent 
                    bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 drop-shadow-lg">
                    Car
                </h1>
                <h3 className="text-6xl font-serif italic text-white tracking-widest 
                    drop-shadow-md">
                    Rental
                </h3>
            </div>
            
            {session ? (
                <div className='z-30 absolute top-5 right-10 font-semibold text-black text-xl'>
                    Welcome {session.user?.name}
                </div>
            ) : null}

            {/* 🚗 Image Button with Sliding Animation */}
            <motion.div 
                initial={{ x: "100vw" }} // Start off-screen (right)
                animate={{ x: "-100vw" }} // Move to the left
                transition={{ 
                    repeat: Infinity, // Infinite loop
                    repeatType: "loop",
                    duration: 10, // Adjust speed (increase for slower movement)
                    ease: "linear" // Smooth constant movement
                }}
                className="z-30 absolute bottom-10 right-0 cursor-pointer"
                onClick={(e) => { e.preventDefault(); router.push('/venue') }}>
                
                {/* Car Image as Button */}
                <Image 
                    src="/img/car-icon.png"  // Replace with your car image
                    alt="Explore Cars"
                    width={220} 
                    height={180} 
                />
            </motion.div>
        </div>
    );
}
