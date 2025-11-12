import nodemailer from 'nodemailer';

export async function sendEmail(to, subject, message) {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOption = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: message,
    };

    await transporter.sendMail(mailOption);
}
