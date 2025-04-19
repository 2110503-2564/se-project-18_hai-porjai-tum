'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';

export default function TierClient({
  tier,
  cars,
  userTier,
  backgroundImage,
}: {
  tier: string;
  cars: any[];
  userTier: string;
  backgroundImage: string;
}) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isReady, setIsReady] = useState(false); // ✅ เพื่อรอ load จาก localStorage

  // โหลดค่าจาก localStorage
  useEffect(() => {
    const storedSort = localStorage.getItem('car_sort_order');
    if (storedSort === 'asc' || storedSort === 'desc') {
      setSortOrder(storedSort);
    }
    setIsReady(true); // ✅ เมื่อโหลดเสร็จแล้ว ค่อย render
  }, []);

  // บันทึกค่าทุกครั้งที่เปลี่ยน
  useEffect(() => {
    if (isReady) {
      localStorage.setItem('car_sort_order', sortOrder);
    }
  }, [sortOrder, isReady]);

  // รอจนโหลดค่าเรียงลำดับเสร็จ
  if (!isReady) {
    return <div className="text-white text-center pt-20">Loading...</div>;
  }

  const sortedCars = [...cars].sort((a, b) =>
    sortOrder === 'asc' ? a.pricePerDay - b.pricePerDay : b.pricePerDay - a.pricePerDay
  );

  return (
    <div
      className="pt-10 px-4 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h2 className="text-2xl text-white text-center font-bold mb-4">
        Showing Cars in Tier: <span className="underline">{tier}</span>
      </h2>

      <div className="flex justify-center mb-6">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="px-4 py-2 rounded-md border shadow text-sm"
        >
          <option value="asc">Sort by Price: Low to High</option>
          <option value="desc">Sort by Price: High to Low</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {sortedCars.length > 0 ? (
          sortedCars.map((car) => (
            <Link key={car.id} href={`/car/${car.id}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
              <Card
                carName={car.name}
                imgSrc={car.picture}
                rating={car.rating}
                tier={car.tier}
                userTier={userTier}
              />
            </Link>
          ))
        ) : (
          <p className="text-white text-center w-full">No cars found for this tier.</p>
        )}
      </div>
    </div>
  );
}
