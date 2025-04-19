"use server";

import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import deleteCar from "@/libs/deleteCar";

export default async function removeCar(id: string) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) {
        throw new Error("Unauthorized");
    }

    const response = await deleteCar(
        id,
        session.user.token
    );

    if (response.ok) {
        revalidateTag("cars");
    }
}