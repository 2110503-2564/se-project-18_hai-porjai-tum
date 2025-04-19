
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Image from 'next/image';
import getAllUsers from '@/libs/getAllUser'; 

export default async function AboutPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <p>You must be signed in to view this page.</p>
      </div>
    );
  }


  const users = await getAllUsers(session.user.token);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">User List</h1>

      <div className="text-center mb-10">
        <p className="text-lg">You're logged in as:</p>
        <div className="inline-block mt-4 p-4 bg-gray-800 rounded-xl shadow-md">
          <Image
            src={session.user._id || '/img/user.jpg'}
            alt={session.user.name || 'User'}
            width={60}
            height={60}
            className="rounded-full mx-auto mb-2"
          />
          <div className="font-bold">{session.user.name}</div>
          <div className="text-sm text-gray-400">Role: {session.user.role}</div>
          <div className="text-sm text-green-400">Balance: ${session.user.payment || 0}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 max-w-5xl mx-auto">
        {users.map((user: any) => (
          <div key={user.id} className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition-all">
            <Image
              src={user.image || '/img/user.jpg'}
              alt={user.name}
              width={100}
              height={100}
              className="rounded-full border-4 border-white shadow-md mb-4"
            />
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-400 mt-1">{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
