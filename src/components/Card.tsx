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
    if (rating == null) return "bg-white/40";
    if (rating > 3) return "bg-green-400";
    if (rating >= 2) return "bg-yellow-400";
    return "bg-red-400";
}

function getHoverShadowColor(tier: string): string {
    switch (tier) {
        default: return "shadow-[0_0_25px_rgba(192,192,192,0.6)]";
    }
}

function canAccessTier(userTier: string, carTier: string): boolean {
    const tierOrder = ["Bronze", "Silver", "Gold", "Ruby", "Diamond"];
    return tierOrder.indexOf(userTier) >= tierOrder.indexOf(carTier);
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
    const shadowColor = getHoverShadowColor(tier);

    return (
        <InteractiveCard
  className={`
    flex flex-row items-stretch 
    bg-[#1a1a1a] border border-gray-300 rounded-xl overflow-hidden 
    transition-all duration-300 ease-in-out 
    hover:scale-105 hover:-translate-y-1 
    hover:bg-gray-700
    ${shadowColor}
    min-h-48 h-48 w-full
  `}
  isLocked={isLocked}
>
  {/* Left: Car Image */}
  <div className="relative w-[45%] h-full">
    <Image
      src={imgSrc}
      alt={carName}
      fill
      className={`object-cover w-full h-full transition-all duration-300 ${isLocked ? 'brightness-50' : ''}`}
    />
    {isLocked && (
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <Image src="/img/lock-icon-11.png" alt="Locked" width={40} height={40} />
      </div>
    )}
  </div>

  {/* Right: Info */}
  <div className="w-[55%] p-4 flex flex-col justify-between">
    <div className="flex items-center justify-between">
      <h3 className="text-white text-lg font-semibold truncate">{carName}</h3>
      

      <span className={`text-xs text-black font-semibold px-2 py-1 rounded-full uppercase
        ${tier === 'Bronze' ? 'bg-[#cd7f32]' :
          tier === 'Silver' ? 'bg-[#c0c0c0]' :
          tier === 'Gold' ? 'bg-[#ffd700]' :
          tier === 'Ruby' ? 'bg-[#e0115f] text-white' :
          tier === 'Diamond' ? 'bg-[#b9f2ff]' :
          'bg-gray-500 text-white'}`}>
        {tier}
      </span>
    </div>
    <div className="mt-2 text-white text-sm">
    <p className="truncate">Seats: {Math.floor(Math.random() * (7 - 2 + 1)) + 2}</p>
    <p className="truncate">Type: {['SUV', 'Sedan', 'Coupe', 'Truck', 'Convertible'][Math.floor(Math.random() * 5)]}</p>
  </div>

    <div className="mt-2">
      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
        <div
          className={`${getProgressBarColor(rating)} h-full`}
          style={{ width: `${(rating / 5) * 100}%` }}
        />
      </div>
      <p className="text-sm text-gray-300 mt-1">
        {getReviewSentiment(rating)} <span className="text-xs text-white/60">({rating}/5)</span>
      </p>
    </div>

    {isLocked && (
      <p className="text-xs text-red-400 mt-2">This car is locked for your tier</p>
    )}
  </div>
</InteractiveCard>

    );
}
