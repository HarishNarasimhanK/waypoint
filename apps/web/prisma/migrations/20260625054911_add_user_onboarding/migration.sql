-- AlterTable
ALTER TABLE "User" ADD COLUMN     "interestedRoles" TEXT[],
ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resumeFileName" TEXT,
ADD COLUMN     "resumeText" TEXT;
