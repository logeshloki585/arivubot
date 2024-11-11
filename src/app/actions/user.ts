"use server";

import { getUser } from "@/lib/auth";
import prisma from "../../lib/prisma";
import { error } from "console";

export const sendUserData = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = prisma.user.create({ data: { name, email, password } });
    return {
      message: "The user has been created sucessfully",
      success: true,
      user: res,
    };
  } catch (e) {
    return { message: "Error sending email", error: e, success: false };
  }
};

export async function getUserId(email: string | null | undefined) {
  if (email != null && email != undefined) {
    const res = await prisma.user.findUnique({ where: { email } });
    return res;
  }
}

export default async function currentUser() {
  const session = await getUser();
  if (session) {
    return { user: session.user?.email };
  } else {
    return null;
  }
}
