import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendPasswordResetEmail(toEmail, resetLink) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "Reset Your Password",
      html: `
            <div>
                <h2>Password Reset Request</h2>
                <p>You requested to reset your password.</p>
                <p>Please click the link below to reset your password:</p>
                <a href="${resetLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
                <p>Or copy this link: ${resetLink}</p>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this, please ignore this email.</p>
            </div>
        `,
    });

    return true;
  } catch (error) {
    return false;
  }
}
