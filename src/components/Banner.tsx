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
    const [hover, setHover] = useState(false);
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

            {/* 🚗 Image Button */}
            <motion.div 
                className="z-30 absolute bottom-10 right-10 cursor-pointer flex items-center gap-4"
                initial={{ x: 0 }}
                whileHover={{ x: -20 }}
                transition={{ type: 'tween', duration: 0.5, ease: 'easeOut' }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={(e) => { e.preventDefault(); router.push('/venue') }}>
                
                {/* Car Image as Button */}
                <motion.div 
                    animate={hover ? { rotate: [0, -5, 5, -5, 5, 0] } : {}} 
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}>
                    <Image 
                        src="/img/car-icon.png"  // Replace with your car image
                        alt="Explore Cars"
                        width={160} 
                        height={120} 
                    />
                </motion.div>
                
                {/* Get Start Text */}
                <motion.span 
                    className="text-white text-3xl font-bold drop-shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hover ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}>
                    Get Start
                </motion.span>
            </motion.div>
        </div>
    );
}
