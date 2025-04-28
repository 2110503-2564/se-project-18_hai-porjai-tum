export function getTierStyle(tier: string) {
    switch (tier) {
        case "Bronze":
            return {
                text: "text-[#cd7f32]",
                border: "border-[#cd7f32]",
                bg: "bg-[#fff8f1]",
                badge: "bg-[#cd7f32]/20 text-[#cd7f32]",
                shadow: "shadow-[0_0_10px_#cd7f32]",
                perks: ["Basic Support", "Access to Standard Deals"],
            };
        case "Silver":
            return {
                text: "text-[#c0c0c0]",
                border: "border-[#c0c0c0]",
                bg: "bg-[#f9f9f9]",
                badge: "bg-[#c0c0c0]/20 text-[#c0c0c0]",
                shadow: "shadow-[0_0_10px_#c0c0c0]",
                perks: ["Priority Support", "Early Access Deals"],
            };
        case "Gold":
            return {
                text: "text-yellow-700",
                border: "border-yellow-200",
                bg: "bg-yellow-50",
                badge: "bg-yellow-100 text-yellow-700",
                shadow: "shadow-[0_0_12px_rgba(234,179,8,0.6)]",
                perks: ["24/7 Support", "Gold-only Discounts", "Free Shipping"],
            };
        case "Ruby":
            return {
                text: "text-blue-700",
                border: "border-blue-200",
                bg: "bg-blue-50",
                badge: "bg-blue-100 text-blue-700",
                shadow: "shadow-[0_0_12px_rgba(96,165,250,0.6)]",
                perks: ["Concierge Service", "Exclusive Offers", "Faster Shipping"],
            };
        case "Diamond":
            return {
                text: "text-cyan-700",
                border: "border-cyan-100",
                bg: "bg-cyan-50",
                badge: "bg-cyan-100 text-cyan-700",
                shadow: "shadow-[0_0_12px_rgba(34,211,238,0.6)]",
                perks: ["VIP Support", "Diamond-only Sales", "Invites to Events"],
            };
        default:
            return {
                text: "text-gray-700",
                border: "border-gray-200",
                bg: "bg-gray-100",
                badge: "bg-gray-200 text-gray-700",
                shadow: "shadow",
                perks: [],
            };
    }
}