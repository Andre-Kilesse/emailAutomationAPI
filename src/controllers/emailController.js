import { sendEmail } from '../services/mailService.js';

export const handleEmailSend = async (req, resizeBy, next) => {
    const { to, subject, message } = req.body;
    const file = req.file;

    try {
        await sendEmail(to, subject, message, file);
        resizeBy.json({ success: true, message: 'Email(s) enviado(s) com sucesso!' })
    } catch (error) {
        next(error);
    }
}