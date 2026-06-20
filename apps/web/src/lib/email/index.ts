import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.EMAIL_FROM || "Waypoint <noreply@waypoint.app>";
const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function sendVerificationEmail(email: string, token: string) {
  const url = `${BASE_URL}/verify-email?token=${token}`;

  if (resend) {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Verify your email for Waypoint",
      html: `
        <h2>Welcome to Waypoint</h2>
        <p>Click the link below to verify your email address:</p>
        <a href="${url}" style="display:inline-block;padding:12px 24px;background:#05AEFC;color:white;text-decoration:none;border-radius:8px;font-weight:600;">
          Verify Email
        </a>
        <p style="margin-top:16px;color:#666;">This link expires in 1 hour.</p>
        <p style="color:#999;font-size:12px;">If you didn't sign up for Waypoint, ignore this email.</p>
      `,
    });
  } else {
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 VERIFICATION EMAIL (dev mode)");
    console.log(`To: ${email}`);
    console.log(`Link: ${url}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const url = `${BASE_URL}/reset-password?token=${token}`;

  if (resend) {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Reset your Waypoint password",
      html: `
        <h2>Reset your password</h2>
        <p>Click the link below to set a new password:</p>
        <a href="${url}" style="display:inline-block;padding:12px 24px;background:#05AEFC;color:white;text-decoration:none;border-radius:8px;font-weight:600;">
          Reset Password
        </a>
        <p style="margin-top:16px;color:#666;">This link expires in 1 hour.</p>
        <p style="color:#999;font-size:12px;">If you didn't request this, ignore this email.</p>
      `,
    });
  } else {
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 PASSWORD RESET EMAIL (dev mode)");
    console.log(`To: ${email}`);
    console.log(`Link: ${url}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  }
}
