import styles from './card.module.css'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard'


function getReviewSentiment(rating: number): string {
    if (rating == null) return "No Review";
    if (rating > 3) return "Mostly Positive";
    if (rating >= 2) return "Mixed";
    return "Mostly Negative";
}

function getProgressBarColor(rating: number): string {
    if (rating == null) return "bg-white-500";
    if (rating > 3) return "bg-red-500";
    if (rating >= 2) return "bg-yellow-500";
    return "bg-black-500";
}

function getHoverShadowColor(tier: string): string {
    switch (tier) {
        case "Bronze":
            return "shadow-[0_0_45px_rgba(165,42,42,0.8)]";
        case "Silver":
            return "shadow-[0_0_45px_rgba(192,192,192,0.8)]";
        case "Gold":
            return "shadow-[0_0_45px_rgba(255,215,0,0.8)]";
        case "Platinum":
            return "shadow-[0_0_45px_rgba(173,216,230,0.8)]";
        case "Diamond":
            return "shadow-[0_0_45px_rgba(135,206,250,0.8)]";
        default:
            return "shadow-[0_0_45px_rgba(128,128,128,0.5)]";
    }
}
function canAccessTier(userTier: string, carTier: string): boolean {
    const tierOrder = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
    const userIndex = tierOrder.indexOf(userTier);
    const carIndex = tierOrder.indexOf(carTier);
    return userIndex >= carIndex;
}


export default function Card({
    carName,
    imgSrc,
    rating,
    tier,
    userTier
}: {
    carName: string,
    imgSrc: string,
    rating: number,
    tier: string,
    userTier: string
}) {
    const isLocked = !canAccessTier(userTier, tier);
    const shadowColor = getHoverShadowColor(tier); // Use the shadow color all the time

    return (
        <InteractiveCard className={`bg-gray-300 border border-gray-300 rounded-lg overflow-hidden`}>

            {/* Image Section */}
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image 
                    src={imgSrc}
                    alt={carName}
                    fill={true}
                    objectFit="cover"
                    className={`object-cover rounded-t-lg duration-500 ease-in-out transform ${isLocked ? 'brightness-70' : ''}`}
                />
                {/* Tier color overlay */}
                <div className={`absolute inset-0 ${shadowColor}`} />

                {/* Lock icon overlay */}
            </div>

            {/* Content Section */}
            <div className="w-full h-[30%] p-[10px] flex flex-col justify-between bg-gray-900">
                {/* Car Name */}
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                    {carName}

                    {isLocked && (
                         <Image
                         src="/img/lock-icon-11.png"
                         alt="logo"
                         width={20}
                         height={20}
                         
                     />
                    )}
                     
                    
                </h3>

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
                    {isLocked && (
                        <span className="text-xs text-red-400 bg-red-900 px-2 py-1 rounded">Locked</span>
                    )}
                </span>
            </div>
        </InteractiveCard>
    );
}
