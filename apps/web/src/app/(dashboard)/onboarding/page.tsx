import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { onboarded: true },
  });

  if (user?.onboarded) redirect("/radar");

  return (
    <div className="max-w-lg mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome to Waypoint</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Tell us a bit about what you're looking for so we can find the best matches.
          </p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}
