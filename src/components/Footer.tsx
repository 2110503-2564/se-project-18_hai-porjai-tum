export default function Footer() {
<<<<<<< HEAD
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
=======
    return (
      <footer className="bg-white border-t border-red-200 py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-700">
          {/* CTA Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ready to get started?</h3>
            <button className="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-red-800 transition">
              Get Started
            </button>
          </div>
  
          {/* Feature Boxes with stroke */}
          <div className="md:border-l md:pl-8 border-red-200">
            <h4 className="font-semibold mb-2">A World of Possibilities</h4>
            <p>Discover our wide range of cars curated for every lifestyle and budget.</p>
          </div>
  
          <div className="md:border-l md:pl-8 border-red-200">
            <h4 className="font-semibold mb-2">Quality That You Can Trust</h4>
            <p>All listings are verified and maintained for high standards of performance.</p>
          </div>
  
          <div className="md:border-l md:pl-8 border-red-200">
            <h4 className="font-semibold mb-2">Get Your Car Faster</h4>
            <p>Swift processing, secure communication, and flexible options — all in one place.</p>
          </div>
        </div>
  
        {/* Bottom Row */}
        <div className="mt-12 text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} Carinder . All rights reserved of CEDT.
        </div>
      </footer>
    )
  }
  
>>>>>>> d3db22c155123064ed0ed8467211e3e255492ed6
