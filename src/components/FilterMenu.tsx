// components/FilterMenu.tsx
'use client'

import { useState } from 'react'

export default function FilterMenu() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['All']);
    const [selectedSeats, setSelectedSeats] = useState<string[]>(['All']);
    const [selectedFuel, setSelectedFuel] = useState<string[]>(['All']);

    const categories = {
        "Car type": ['All', 'Economy', 'Compact', 'Standard', 'Full Size', 'Premium', 'Van', 'SUV/RV', 'Electric car', 'Imported'],
        "Seats": ['All', '5Seats', '7Seats', '9Seats'],
        "Fuel type": ['All', 'Diesel', 'Electric', 'Gasoline', 'Hybrid Gasoline']
    };

    const toggleOption = (option: string, state: string[], setState: (val: string[]) => void) => {
        if (option === 'All') {
            setState(['All']);
        } else {
            const newState = state.includes(option)
                ? state.filter(i => i !== option)
                : [...state.filter(i => i !== 'All'), option];
            setState(newState);
        }
    };

    return (
        <div className="w-full lg:w-[250px] p-4 bg-white rounded shadow-md text-sm font-medium">
            {Object.entries(categories).map(([category, options]) => (
                <div key={category} className="mb-6">
                    <h3 className="text-lg font-bold mb-2">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                        {options.map(option => (
                            <label key={option} className="flex items-center gap-1 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={
                                        category === 'Car type'
                                            ? selectedTypes.includes(option)
                                            : category === 'Seats'
                                                ? selectedSeats.includes(option)
                                                : selectedFuel.includes(option)
                                    }
                                    onChange={() =>
                                        toggleOption(
                                            option,
                                            category === 'Car type' ? selectedTypes :
                                            category === 'Seats' ? selectedSeats : selectedFuel,
                                            category === 'Car type' ? setSelectedTypes :
                                            category === 'Seats' ? setSelectedSeats : setSelectedFuel
                                        )
                                    }
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <button
                className="mt-4 w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700"
                onClick={() => {
                    setSelectedTypes(['All']);
                    setSelectedSeats(['All']);
                    setSelectedFuel(['All']);
                }}
            >
                Filter reset ⟳
            </button>
        </div>
    );
}
