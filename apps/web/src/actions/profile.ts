"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function completeOnboarding(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const rolesRaw = formData.get("roles") as string;
  const resumeText = (formData.get("resumeText") as string)?.replace(/\x00/g, "") || null;
  const resumeFileName = formData.get("resumeFileName") as string;

  const roles = rolesRaw
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      onboarded: true,
      interestedRoles: roles,
      resumeText,
      resumeFileName: resumeFileName || null,
    },
  });

  redirect("/radar");
}

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const name = formData.get("name") as string;
  const rolesRaw = formData.get("roles") as string;
  const resumeText = (formData.get("resumeText") as string)?.replace(/\x00/g, "") || undefined;
  const resumeFileName = formData.get("resumeFileName") as string;

  const roles = rolesRaw
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: name || undefined,
      interestedRoles: roles,
      resumeText: resumeText || undefined,
      resumeFileName: resumeFileName || undefined,
    },
  });

  redirect("/profile");
}
