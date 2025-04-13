'use client';

import React, { useEffect, useState } from 'react';
import { FaGem } from 'react-icons/fa';
import getCars from '@/libs/getCars';

const prizes = [
  '10% OFF',
  'Free Rental Hour',
  'Lucky Coin x5',
  'Try Again',
  'VIP Day Access',
  '20% OFF',
];

export default function PromotionPage() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [lastGame, setLastGame] = useState<'slot' | 'bingo' | null>(null);
  const [car, setCar] = useState<any | null>(null);

  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const spin = (gameType: 'slot' | 'bingo') => {
    setSpinning(true);
    setResult(null);
    setLastGame(gameType);
    setTimeout(() => {
      const win = prizes[Math.floor(Math.random() * prizes.length)];
      setResult(win);
      setSpinning(false);
    }, 2000);
  };

useEffect(() => {
  const fetchCars = async () => {
    try {
      const carData = await getCars(); // carData is a single object
      setCar(carData);
    } catch (error) {
      console.error('Failed to fetch car:', error);
    }
  };

  const fetchExchangeRate = async () => {
    try {
      const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=THB');
      const data = await res.json();
      setExchangeRate(data.rates.THB);
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
    }
  };

  fetchCars();
  fetchExchangeRate();
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Promo Minigame Zone</h1>
      <p className="text-center text-gray-300 mb-10 max-w-md">
        Spin the wheel or play minigames to win exclusive discounts, free rental time, and more!
      </p>

      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center text-center">
        <FaGem className="text-cyan-400 text-5xl mb-4 animate-bounce" />
        <h2 className="text-xl font-semibold mb-2">Slot Spin</h2>
        <p className="text-sm text-gray-400 mb-6">
          Try your luck! You could win something amazing...
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => spin('slot')}
            disabled={spinning}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-full transition disabled:opacity-50"
          >
            Spin Slot
          </button>
          <button
            onClick={() => spin('bingo')}
            disabled={spinning}
            className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-full transition disabled:opacity-50"
          >
            Play Bingo
          </button>
        </div>

        {spinning && (
          <div className="mt-6 text-yellow-400 font-bold animate-pulse">
            Spinning...
          </div>
        )}

        {result && (
          <div className="mt-6 text-lg font-bold text-green-400 animate-pulse">
            {lastGame === 'bingo' ? 'Bingo prize:' : 'Slot prize:'} {result}!
          </div>
        )}
      </div>

      {car ? (
  <div className="text-sm">
    {car.name}: <span className="text-green-400">${car.price}</span>
  </div>
) : (
  <p className="text-sm text-gray-400">Loading car price...</p>
)}


      {/* Exchange Rate Info */}
      <div className="mt-6 text-sm text-gray-400">
        {exchangeRate
          ? `Current USD to THB Rate: ฿${exchangeRate.toFixed(2)}`
          : 'Fetching exchange rate...'}
      </div>
    </div>
  );
}
