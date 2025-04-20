import getRentals from "@/libs/getRentals";
import ChatSelecter from "@/components/AdminInbox";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getAllUsers from "@/libs/getAllUser";
import Image from "next/image";
import Link from "next/link";

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const [rentals, users] = await Promise.all([
    session ? getRentals(session.user.token) : null,
    session ? getAllUsers(session.user.token) : [],
  ]);

  // Filter to only include admin users
  const adminUsers = users.filter((user: any) => user.role === "admin" || user.isAdmin);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Admin Bar */}
      <div className="flex items-center gap-4 overflow-x-auto p-4 border-b bg-white">
        {adminUsers.length > 0 ? (
          adminUsers.map((user: any) => (
            <Link
              key={user.id}
              href={`/inbox/${user.id}`}
              className="flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 relative">
                <Image
                  src={user.name === "porjai" ?  "/img/popop2.jpeg" : "/img/max.jpg"}
                  alt={user.name}
                  fill
                  className="rounded-full object-cover border-2 border-gray-300"
                />
              </div>
              <span className="text-xs mt-1 w-16 truncate">{user.name}</span>
            </Link>
          ))
        ) : (
          <div className="text-gray-500">No admin users found</div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with ChatSelecter */}
        <div className="w-[25vw] border-r overflow-y-auto">
          {rentals ? <ChatSelecter rentals={rentals} /> : null}
        </div>

        {/* Main Chat Content */}
        <div className="flex-1 p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
