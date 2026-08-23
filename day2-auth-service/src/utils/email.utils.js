import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

export const sendVerificationEmail = async (email, token)=>{
   const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  await transporter.sendMail({
    from: `"Auth Service" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email address",
    html: `
      <h2>Welcome! Please verify your email</h2>
      <p>Click the link below to verify your email address.</p>
      <p>This link expires in <strong>24 hours</strong>.</p>
      <a href="${verifyUrl}" style="
        background:#4F46E5;
        color:white;
        padding:12px 24px;
        border-radius:6px;
        text-decoration:none;
      ">Verify Email</a>
      <p>Or copy this link: ${verifyUrl}</p>
    `,
  });
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  await transporter.sendMail({
    from: `"Auth Service" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Request",
    html: `
      <h2>Password Reset</h2>
      <p>You requested to reset your password.</p>
      <p>This link expires in <strong>15 minutes</strong>.</p>
      <a href="${resetUrl}" style="
        background:#DC2626;
        color:white;
        padding:12px 24px;
        border-radius:6px;
        text-decoration:none;
      ">Reset Password</a>
      <p>Or copy this link: ${resetUrl}</p>
      <p>If you did not request this, ignore this email.</p>
    `,
  });
};