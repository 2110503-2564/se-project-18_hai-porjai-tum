'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
};

export default function AboutPage() {
  const [admins, setAdmins] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    const mockContributors: User[] = [
      { id: 'test4', name: 'orway', role: 'UI', avatar: '/img/popop2.jpeg' },
      { id: 'test3', name: 'tenouuu', role: 'admin', avatar: '/img/teno.jpg' },
      { id: '3', name: 'Siphax', role: 'admin', avatar: '/img/max.jpg' },
      { id: '4', name: 'Jokungz', role: 'admin', avatar: '/img/glass.jpg' },
      { id: '5', name: 'tahto', role: 'admin', avatar: '/img/tah.jpg' },
      { id: '6', name: 'TRIPATROPATRALALALIRILIRATUNGTUN', role: 'admin', avatar: '/img/PannGG.jpg' },
      { id: '7', name: 'qwert_ato', role: 'admin', avatar: '/img/mokun.png' },
      { id: '8', name: 'Master T', role: 'admin', avatar: '/img/user.jpg' },
    ];
    setAdmins(mockContributors);
  }, []);

  const handleChat = (userId: string) => {
    router.push(`/chat/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">Contributors</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 max-w-5xl mx-auto">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition-all"
          >
            <Image
              src={admin.avatar || '/img/user.jpg'}
              alt={admin.name}
              width={100}
              height={100}
              className="rounded-full border-4 border-white shadow-md mb-4"
            />
            <h2 className="text-xl font-semibold">{admin.name}</h2>
            <p className="text-sm text-gray-400 mt-1">{admin.role}</p>

            <button
              onClick={() => handleChat(admin.id)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
            >
              Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
