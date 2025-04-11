'use client';

import React, { useEffect, useState } from 'react';

const newsItems = [
    "🔥 Flash Sale: 30% off weekend rentals!",
    "🚗 New luxury cars added this week!",
    "🎁 Get free upgrades with Platinum tier!",
    "💎 Diamond tier exclusive: early access booking.",
    "📢 Refer a friend and earn free miles!",
    "🌟 Bronze members now earn double points this month!",
    "🛠️ Maintenance checks included on all rentals!",
    "📆 Book 5 days, get the 6th free!",
    "⚡ Limited Time: Electric car rentals now 20% off!",
    "🏝️ Plan your summer roadtrip with discounts on SUVs!",
    "🎉 Celebrate our anniversary with surprise deals every Friday!",
    "📲 Download our app for exclusive app-only rewards!",
    "🆕 Classic vintage cars now available to rent!",
    "💼 Corporate rental plans now live!",
    "💳 Pay with card, earn cashback rewards!",
    "🔧 All cars now come with 24/7 roadside assistance!",
    "🥇 Upgrade to Silver tier instantly with 2 bookings!",
    "🏆 Tier rewards now include free car washes!",
    "🕓 Early Bird: Book before 9am and save 10%!",
    "🎮 Win a free ride by playing our mini-game!",
    "📍 New pickup locations added in 5 provinces!",
    "👨‍👩‍👧‍👦 Family van rentals now include child seats for free!",
    "🛣️ Long-term plans: Save more on weekly rentals!",
    "🏁 Race weekend special: Sports cars at 25% off!",
    "👔 Dress sharp, ride sharp – business class vehicles now discounted.",
    "🌙 Night Owl Deal: Save 15% on bookings after 10PM.",
    "🎓 Student discount: 10% off with university ID!",
    "💼 Weekend warriors: Business car rentals from Fri-Sun now cheaper!",
    "📦 New package: Rent + Hotel combo discounts live!",
    "🚙 SUVs now available in all locations.",
    "👶 Free baby seat rental for Gold tier members!",
    "🏆 Loyalty program rewards updated this month!",
    "🔁 Rebooking within 7 days? Get 50% off next rental!",
    "🕹️ Spin the Wheel in-app for daily rewards!",
    "🪙 Earn points and redeem for gas cards!",
    "🌊 Beach drive specials: Convertibles on sale!",
    "☃️ Winter safety packages now available.",
    "💥 Flash drop: Promo codes hidden on homepage!",
    "📦 Monthly subscription rentals now open!",
    "🛍️ Promo bundles now include gas vouchers.",
    "🎟️ Weekend getaway raffle now open to all tiers!",
    "🛵 Scooter and bike rentals added!",
    "🚗 All cars sanitized and safety-checked.",
    "📉 Prices dropped for mid-size sedans!",
    "👑 Diamond tier gets free airport pickup.",
    "🎬 Featured in Netflix’s newest car docuseries!",
    "🔐 Book now, pay later now available!",
    "🖼️ Custom decal options now live for rentals!",
    "🆓 First-time user? Enjoy your first ride free (conditions apply).",
    "🌍 Going green: More EVs available now.",
    "📞 Live chat support now available 24/7.",
    "📆 Book ahead and save up to 25%!",
    "🔁 One-way rentals now supported in 10 new cities.",
    "🛫 Airport express rentals come with VIP parking.",
    "🎯 Flash Mission: Complete 3 bookings = 1 free ride!",
    "🌙 New midnight deals posted every night!",
    "🏕️ Adventure gear add-on packs now offered.",
    "🔍 New AI assistant helps you pick the perfect ride!",
    "📚 Student plans now include exam week discounts.",
    "🍂 Fall escape deals: Cross-country trips now cheaper!",
    "🚉 Station pickups now expanded to 12 locations.",
    "👟 Running errands? Get 50% off 3-hour bookings.",
    "🚦 Save on toll charges with Gold+ plans!",
    "🛠️ Need a replacement car? Fast-track now available.",
    "🎨 Custom wrap rentals launching next month!",
    "💌 Email subscribers get monthly promo drops!",
    "🎁 Tier mystery boxes unlocked every 10th of the month.",
    "🌇 Sunset drive pack comes with included dinner coupons!",
    "🎤 Featured in Car & Road Magazine’s top 10 services!",
    "🚐 New fleet of campervans ready for road trips.",
    "🍀 Lucky rentals: Book on the 13th = random discount!",
    "🛒 New flash deals every Friday at 10AM!",
    "💡 Tips & tricks for maximizing your rental points now online.",
    "🎈 Birthday month? Claim a free bonus add-on!",
    "🎯 Milestone system revamped for easier tier ups.",
    "📦 Family packs now include snack boxes!",
    "🗺️ New explore mode: curated scenic routes per rental!",
    "🥤 Rent & Chill: Free drink vouchers included with all rentals.",
    "🏫 Campus ambassador program now open!",
    "🎮 Game night cars: built-in consoles in select vehicles!",
    "📽️ Book now for movie-night-on-wheels experience!",
    "⏰ Missed a booking? Retry codes available for loyal members.",
    "🧼 Car spa days added to premium bookings!",
    "📸 Photo contest: Win discounts by sharing your trips!",
    "📣 Beta testers wanted for our next-gen rental app!",
    "🌿 Eco-drive leaderboard: Compete for green rewards!",
    "🏁 Race-inspired vehicles added for sports lovers.",
    "🏨 Hotel partners now offer discount with our rentals!",
    "🚫 No hidden fees policy now expanded!",
    "🚚 Moving day deal: rent trucks at half price on Sundays.",
    "🎉 End of month mega sales: up to 40% off!",
    "🧳 Travel light: included storage compartments in vans!",
    "🚘 Vintage car events – exclusive access for top tier!",
    "🧭 Road trip kits now include printed maps and playlists.",
    "🔒 Insurance upgrades free for Silver and above!",
    "📦 Business packs now come with extra accessories.",
    "💸 Claim your refund in points if your ride arrives late!",
    "🧠 AI picks: Get car suggestions based on your mood!",
    "📊 New dashboard for tracking points, rewards, and bookings!",
  ];
  

export default function NewsTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % newsItems.length);
    }, 4000); // rotate every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white px-4 py-1 rounded-xl shadow-md min-w-[280px] max-w-[480px] text-center animate-fadeIn transition-all duration-500">
      <span className="text-gray-900 text-sm font-semibold">{newsItems[index]}</span>
    </div>
  );
}
