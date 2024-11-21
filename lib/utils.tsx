import crypto from "crypto";
import { mailer } from "./email";

export const saltAndHashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex"); // Generate random salt
  const hash = hashResult(password, salt);
  return `${salt}:${hash}`; // Store as salt:hash
};

export const hashResult = (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex"); // Generate hash
};

// const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  email: string,
  subject: string,
  resetLink: string
) => {
  await mailer.sendMail({
    from: "login-project@resend.dev",
    subject: subject,
    to: email,
    text: `hello, click the link to reset your email, ${resetLink}`,
  });
};

// export const sendEmail = async (
//   email: string,
//   subject: string,
//   resetLink: string
// ) => {
//   try {
//     client.send(
//       {
//         text: `hello, click the link to reset your email, ${resetLink}`,
//         from: "loginProject@email.com>",
//         to: email,
//         // cc: 'else <else@your-email.com>',
//         subject: subject,
//       },
//       (err, message) => {
//         console.log(err || message);
//       }
//     );
//   } catch (error) {
//     console.log("🚀 ~ error:", error);
//   }
// };

// export const sendEmail = async (
//   email: string,
//   subject: string,
//   resetLink: string
// ): Promise<void> => {
//   try {
//     const serviceId = "service_cqisbiq"; // Replace with your EmailJS Service ID
//     const templateId = "template_cr16sio"; // Replace with your EmailJS Template ID
//     const userId = "bxHUYB_GZoJjkmkKO"; // Replace with your EmailJS Public Key

//     const templateParams = {
//       to_email: email, // Recipient email address
//       subject: subject, // Email subject
//       reset_link: resetLink, // Password reset link
//     };

//     // Send email using EmailJS
//     const response = await emailjs.send(
//       serviceId,
//       templateId,
//       templateParams,
//       userId
//     );

//     console.log("Email sent successfully:", response);
//   } catch (error) {
//     console.error("Failed to send email:", error);
//   }
// };
