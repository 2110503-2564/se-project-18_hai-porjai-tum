"use server";

import updateCar from "@/libs/updateCar";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function editCar(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) {
        throw new Error("Unauthorized");
    }

    const response = await updateCar(
        formData.get("id") as string,
        formData.get("name") as string,
        formData.get("model") as string,
        formData.get("tel") as string,
        Number(formData.get("dayRate") as string),
        formData.get("picture") as string,
        formData.get("tier") as string,
        session.user.token
    );

    if (response.success) {
        revalidateTag("cars");
    }
}