"use server";

import createCar from "@/libs/createCar";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function addCar(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) {
        throw new Error("Unauthorized");
    }

    const response = await createCar(
        formData.get("name") as string,
        formData.get("model") as string,
        formData.get("tel") as string,
        Number(formData.get("dayRate") as string),
        formData.get("picture") as string,
<<<<<<< HEAD
=======
        formData.get("tier") as string,
>>>>>>> d3db22c155123064ed0ed8467211e3e255492ed6
        session.user.token
    );

    if (response.success) {
        revalidateTag("cars");
    }
}