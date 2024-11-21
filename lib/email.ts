import nodemailer from "nodemailer";
import { SMTPClient } from 'emailjs';

export const mailer = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 587,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});



export const client = new SMTPClient({
	user: 'user',
	password: 'password',
	host: 'smtp.your-email.com',
	ssl: true,
});


// client.send(
// 	{
// 		text: 'i hope this works',
// 		from: 'you <username@your-email.com>',
// 		to: 'someone <someone@your-email.com>, another <another@your-email.com>',
// 		cc: 'else <else@your-email.com>',
// 		subject: 'testing emailjs',
// 	},
// 	(err, message) => {
// 		console.log(err || message);
// 	}
// );