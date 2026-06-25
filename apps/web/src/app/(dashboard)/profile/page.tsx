import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile/profile-form";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      interestedRoles: true,
      resumeText: true,
      resumeFileName: true,
    },
  });

  if (!user) redirect("/login");

  return (
    <div className="max-w-lg">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold">Profile</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            Update your preferences to improve job recommendations.
          </p>
        </div>
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
