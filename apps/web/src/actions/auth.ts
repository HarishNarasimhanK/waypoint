"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { generateToken, hashToken, generateTokenExpiry } from "@/lib/auth/tokens";
import { signupSchema, forgotPasswordSchema, resetPasswordSchema } from "@/lib/auth/schemas";
import { sendVerificationEmail, sendPasswordResetEmail } from "@/lib/email";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export type AuthState = {
  error?: string;
  success?: string;
};

export async function signup(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: "If this email is not already registered, check your inbox." };
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: { name, email, hashedPassword },
  });

  const token = generateToken();
  const hashedTokenValue = hashToken(token);

  await prisma.verificationToken.create({
    data: {
      email,
      token: hashedTokenValue,
      expires: generateTokenExpiry(1),
    },
  });

  await sendVerificationEmail(email, token);

  return { success: "Check your email to verify your account." };
}

export async function login(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid credentials" };
    }
    throw error;
  }

  redirect("/radar");
}

export async function forgotPassword(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { email } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    // Invalidate old tokens
    await prisma.passwordResetToken.updateMany({
      where: { email, used: false },
      data: { used: true },
    });

    const token = generateToken();
    const hashedTokenValue = hashToken(token);

    await prisma.passwordResetToken.create({
      data: {
        email,
        token: hashedTokenValue,
        expires: generateTokenExpiry(1),
      },
    });

    await sendPasswordResetEmail(email, token);
  }

  // Always return success (don't reveal if email exists)
  return { success: "If that email exists, we sent a reset link." };
}

export async function resetPassword(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { token, password } = parsed.data;
  const hashedTokenValue = hashToken(token);

  const storedToken = await prisma.passwordResetToken.findFirst({
    where: {
      token: hashedTokenValue,
      used: false,
      expires: { gt: new Date() },
    },
  });

  if (!storedToken) {
    return { error: "Invalid or expired reset link" };
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.update({
    where: { email: storedToken.email },
    data: { hashedPassword },
  });

  await prisma.passwordResetToken.update({
    where: { id: storedToken.id },
    data: { used: true },
  });

  return { success: "Password reset successfully. You can now log in." };
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
