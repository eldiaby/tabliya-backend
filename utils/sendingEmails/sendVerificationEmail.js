const sendEmail = require('./sendEmail.js');

const sendVerificationEmail = async ({ name, email, verificationToken }) => {
  const verificationLink = `${process.env.FRONTEND_ORIGIN}/verify-email?token=${verificationToken}`;

  const html = `
    <div style="font-family: 'Georgia', serif; background-color: #fff8f0; padding: 30px; color: #4b3b2a;">
      <div style="max-width: 600px; margin: auto; border: 1px solid #e0d6cc; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); padding: 20px;">
        <h2 style="color: #a0522d;">Welcome to Tabliya, ${name}!</h2>
        <p>Thank you for signing up! To activate your account, please verify your email by clicking the button below:</p>
        <a href="${verificationLink}" 
           style="display: inline-block; padding: 12px 24px; background-color: #a0522d; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-family: 'Arial', sans-serif;">
          Verify Email
        </a>
        <p style="margin-top: 20px;">If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-wrap: break-word; overflow-wrap: anywhere; max-width: 100%;">
          <a href="${verificationLink}" style="color: #a0522d; text-decoration: none;">${verificationLink}</a>
        </p>
        <p>If you didn’t create this account, you can safely ignore this email.</p>
        <br/>
        <p style="font-style: italic;">Warm regards,</p>
        <p style="font-weight: bold;">The Tabliya Team 🍽️</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Verify Your Email – Tabliya',
    html,
  });
};

module.exports = sendVerificationEmail;
