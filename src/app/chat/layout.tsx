import getRentals from "@/libs/getRentals";
import ChatSelecter from "@/components/ChatSelecter"; // Adjust path according to your file structure
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  const rentals = session ? await getRentals(session?.user.token) : null
  // console.log(rentals)
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar with ChatSelecter */}
      <div className="w-[25vw] border border-silver overflow-y-auto">
        {rentals ? <ChatSelecter rentals={rentals} /> : null}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4">
        {children} {/* Render the content passed to this layout */}
      </div>
    </div>
  );
}
