'use client'

import { useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveCard({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const [isDragging, setIsDragging] = useState(false);

    function onCardMouseAction(event: React.SyntheticEvent) {
        if (event.type === 'mouseover' && !isDragging) {
            event.currentTarget.classList.remove('shadow-lg');
            event.currentTarget.classList.add('shadow-2xl');
            event.currentTarget.classList.add('bg-neutral-200');
        } else if (!isDragging) {
            event.currentTarget.classList.remove('shadow-2xl');
            event.currentTarget.classList.remove('bg-neutral-200');
            event.currentTarget.classList.add('shadow-lg');
            event.currentTarget.classList.add('bg-gray-300');
        }
    }

    return (
        <motion.div
            className={`w-full h-[300px] rounded-lg shadow-lg bg-gray-300 ${className}`}
            onMouseOver={(e) => onCardMouseAction(e)}
            onMouseOut={(e) => onCardMouseAction(e)}
            drag // Enables drag functionality
            onDragStart={() => setIsDragging(true)} // Set dragging state when dragging starts
            onDragEnd={() => setIsDragging(false)} // Reset dragging state when dragging ends
            whileHover={{
                scale: 1.05, // Slight zoom effect on hover
                rotate: [0, -1, 1, -1, 0], // Shaking effect
                transition: { duration: 0.4, repeat: Infinity, repeatType: "loop" },
            }}
            style={{
                cursor: isDragging ? "grabbing" : "grab", // Change the cursor to indicate draggable
            }}
        >
            {children}
        </motion.div>
    );
}
