import getAllUsers from "@/libs/getAllUser";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

interface Spender {
  userId: string;
  name: string;
  payment: number;
  profileImage?: string;
}

export default async function TopSpenders() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const users = await getAllUsers(session.user.token);

  const spenders: Spender[] = users
    .filter((user: any) => user.payment > 0)
    .map((user: any) => ({
      userId: user._id,
      name: user.name,
      payment: user.payment,
      profileImage: user.image || user.profileImage || null,
    }));

  const sorted = spenders.sort((a, b) => b.payment - a.payment);
  const podium = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div className="min-h-screen bg-[url('/img/tinderbg.png')] bg-cover bg-center text-white relative">
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

      <div className="relative z-10 flex flex-col items-center p-6">
        <h2 className="text-3xl font-bold mb-8 text-center">🏆 Top Spenders</h2>

        {sorted.length === 0 ? (
          <div className="text-gray-300 italic text-center">No payment records found.</div>
        ) : (
          <>
            {/* Podium */}
            <div className="flex justify-center items-end gap-6 mb-10">
              {/* 2nd Place */}
              {podium[1] && (
                <div className="flex flex-col items-center">
                  <div className="bg-slate-400 text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-bold mb-2 shadow-md">
                    🥈
                  </div>
                  <UserDisplay user={podium[1]} />
                  <div className="text-sm text-green-300">${podium[1].payment.toFixed(2)}</div>
                  <div className="bg-gray-700 w-20 h-16 mt-2 rounded-t-md"></div>
                </div>
              )}

              {/* 1st Place */}
              {podium[0] && (
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-400 text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold mb-2 shadow-lg">
                    🥇
                  </div>
                  <UserDisplay user={podium[0]} large />
                  <div className="text-md text-green-300">${podium[0].payment.toFixed(2)}</div>
                  <div className="bg-gray-700 w-24 h-24 mt-2 rounded-t-md"></div>
                </div>
              )}

              {/* 3rd Place */}
              {podium[2] && (
                <div className="flex flex-col items-center">
                  <div className="bg-amber-700 text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-bold mb-2 shadow-md">
                    🥉
                  </div>
                  <UserDisplay user={podium[2]} />
                  <div className="text-sm text-green-300">${podium[2].payment.toFixed(2)}</div>
                  <div className="bg-gray-700 w-20 h-12 mt-2 rounded-t-md"></div>
                </div>
              )}
            </div>

            {/* Remaining users */}
            <ul className="space-y-3 w-full max-w-md">
              {rest.map((user, i) => (
                <li key={user.userId} className="bg-gray-800 p-4 rounded-xl shadow flex items-center gap-4">
                  <span className="font-semibold text-yellow-300">#{i + 4}</span>
                  {user.profileImage && (
                    <Image
                      src={"/img/popop2.jpeg"}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-green-400">${user.payment.toFixed(2)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

// Component to display user name and profile picture
function UserDisplay({ user, large = false }: { user: Spender; large?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      {user.profileImage && (
        <Image
          src={"/img/popop2.jpeg"}
          alt={user.name}
          width={large ? 60 : 40}
          height={large ? 60 : 40}
          className="rounded-full object-cover"
        />
      )}
      <div className={large ? "text-xl font-semibold" : "text-lg"}>{user.name}</div>
    </div>
  );
}
