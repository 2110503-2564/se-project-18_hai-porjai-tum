import getAllRentals from "@/libs/getRentals"; // You need this function
import getUserById from "@/libs/getUserProfile"; // You need this too
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

  const rentalRes = await getAllRentals(session.user.token);
  if (!rentalRes.success) return <div>Failed to load rentals</div>;

  const uniqueUserIds = Array.from(new Set(rentalRes.data.map(r => r.user)));

  const spenders: Spender[] = [];

  for (const userId of uniqueUserIds) {
    if (!userId) continue;
    const userRes = await getUserById(  session.user.token);
    if (userRes.success) {
      spenders.push({
        userId: userRes.data._id,
        name: userRes.data.name,
        payment: userRes.data.payment,
      });
    }
  }

  const sorted = spenders.sort((a, b) => b.payment - a.payment);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4"> Top Spenders</h2>
      <ul className="space-y-2">
        {sorted.map((user, i) => (
          <li key={user.userId} className="bg-gray-800 p-4 rounded-xl shadow">
            <span className="font-semibold text-yellow-300">#{i + 1}</span>{" "}
            {user.name} - <span className="text-green-400">${user.payment}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
