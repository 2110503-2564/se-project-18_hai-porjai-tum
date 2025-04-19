import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function requireAdmin() {
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
    redirect("/unauthorized");
  }

  return session;
}