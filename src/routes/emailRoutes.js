import express from 'express';
import { sendEmail } from '../services/mailService.js';

const router = express.Router();

router.post('/send', async (req, res) => {
    const { to, subject, message } = req.body;
    try {
        await sendEmail(to, subject, message);
        res.json({ sucess: true, message: 'E-mail enviado com sucesso!' })
    } catch (error) {
        res.status(500).json({sucess: false, error: error.message});
    }
});

export default router;