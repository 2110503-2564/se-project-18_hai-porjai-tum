export default function Footer() {
    const cards = [
        {
            title: "Explore",
            subtitle: "Cars Catalog",
            description: "Explore new Cars From owner world-wide.",
        },
        {
            title: "Get Start",
            subtitle: "Let's getting in",
            description: "Our latest feature.",
        },
        {
            title: "Short",
            subtitle: "Active",
            description: "Create Rental in no time.",
        },
    ];

    return (
        <div className="bg-white border-t border-gray-300 py-10 relative">
            {/* Cards Section */}
            <div className="max-w-7xl mx-auto flex justify-around items-start gap-8 -mt-20">
                {cards.map((card, i) => (
                    <div
                        key={i}
                        className="bg-white border border-black shadow-lg p-6 rounded-lg w-80 text-center relative"
                    >
                        {/* Red Square */}
                        <div className="absolute top-4 right-4 w-8 h-16 bg-red-500"></div>

                        {/* Card Content */}
                        <h2 className="text-xl font-bold text-gray-700 mb-2">
                            {card.title}
                        </h2>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            {card.subtitle}
                        </h3>
                        <p className="text-gray-600">{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
