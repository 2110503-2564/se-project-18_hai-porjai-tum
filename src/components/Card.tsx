import styles from './card.module.css'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard'

function getReviewSentiment(rating: number): string {
    if (rating > 3) return "Mostly Positive";
    if (rating >= 2) return "Mixed";
    return "Mostly Negative";
}

function getProgressBarColor(rating: number): string {
    if (rating > 3) return "bg-yellow-500"; // Positive: Yellow
    if (rating >= 2) return "bg-green-500";  // Mixed: Green
    return "bg-red-500"; // Negative: Red
}

export default function Card({ carName, imgSrc, rating }: { carName: string, imgSrc: string, rating: number }) {
    return (
        <InteractiveCard>
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image src={imgSrc}
                    alt={carName}
                    fill={true}
                    objectFit='cover'
                    className='object-cover rounded-t-lg' />
            </div>
            <div className="w-full h-[30%] p-[10px] flex flex-col justify-between">
                <h3 className="font-semibold text-lg">{carName}</h3>
                <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                    <div 
                        className={`${getProgressBarColor(rating)} h-full transition-all`} 
                        style={{ width: `${(rating / 5) * 100}%` }} />
                </div>
                <span className="text-sm text-gray-600 mt-1">
                    {getReviewSentiment(rating)} ({rating}/5)
                </span>
            </div>
        </InteractiveCard>
    )
}
