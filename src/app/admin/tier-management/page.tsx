import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TierList from "@/components/TierList";

export default async function TierManagementPage() {
  const session = (await getServerSession(authOptions)) as {
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
      token: string;
      payment: number;
    };
  };

  if (!session || session.user.role !== "admin") {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Tier Management</h1>
      <TierList />
    </div>
  );
}