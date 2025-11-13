import nodemailer from 'nodemailer';
import fs from 'fs';

export async function sendEmail(to, subject, message, file = null) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html: message,
    };

    if (file) {
        mailOptions.attachments = [
            {
                filename: file.originalname,
                path: file.path,
            },
        ];
    }

    await transporter.sendMail(mailOptions);

    if (file) {
        fs.unlink(file.path, (err) => {
            if (err) console.error('Erro ao apagar arquivo:', err);
        });
    }
}
