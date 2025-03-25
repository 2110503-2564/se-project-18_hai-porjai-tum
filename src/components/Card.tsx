import styles from './card.module.css'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard'

function getReviewSentiment(rating: number): string {
    if (rating > 3) return "Mostly Positive";
    if (rating >= 2) return "Mixed";
    return "Mostly Negative";
}

function getProgressBarColor(rating: number): string {
    if (rating > 3) return "bg-red-500"; // Positive: Yellow
    if (rating >= 2) return "bg-yellow-500";  // Mixed: Green
    return "bg-black-500"; // Negative: Red
}


export default function Card({ carName, imgSrc, rating }: { carName: string, imgSrc: string, rating: number }) {
    return (
        

        

        
        <InteractiveCard className="bg-gray-300 border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image Section */}
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image 
                    src={imgSrc}
                    alt={carName}
                    fill={true}
                    objectFit="cover"
                    className="object-cover rounded-t-lg"
                />
            </div>

            {/* Content Section */}
            <div className="w-full h-[30%] p-[10px] flex flex-col justify-between bg-gray-900">
                {/* Car Name */}
                <h3 className="font-bold text-lg text-white">{carName}</h3>

                {/* Progress Bar */}
                <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden mt-2">
                    <div 
                        className={`${getProgressBarColor(rating)} h-full transition-all`} 
                        style={{ width: `${(rating / 5) * 100}%` }} 
                    />
                </div>

                {/* Rating and Sentiment */}
                <span className="text-sm text-gray-200 mt-2 font-medium">
                    {getReviewSentiment(rating)} ({rating}/5)
                </span>
            </div>
        </InteractiveCard>
    );
}

