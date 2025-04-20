import getAllUsers from "@/libs/getAllUser";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

interface Spender {
  userId: string;
  name: string;
  payment: number;
}

export default async function TopSpenders() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const users = await getAllUsers(session.user.token);

  const spenders: Spender[] = users
    .filter((user: User) => user.payment > 0)
    .map((user: User) => ({
      userId: user._id,
      name: user.name,
      payment: user.payment,
    }));

  const sorted = spenders.sort((a, b) => b.payment - a.payment);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">💰 Top Spenders</h2>
      {sorted.length === 0 ? (
        <div className="text-gray-300 italic">No payment records found.</div>
      ) : (
        <ul className="space-y-2">
          {sorted.map((user, i) => (
            <li key={user.userId} className="bg-gray-800 p-4 rounded-xl shadow">
              <span className="font-semibold text-yellow-300">#{i + 1}</span>{" "}
              {user.name} -{" "}
              <span className="text-green-400">${user.payment.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
