import express from 'express';
import { sendEmail } from '../services/mailService.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
    '/send', 
    [
        body('to')
            .custom(value => {
                if (Array.isArray(value)){
                    const allEmailIsValid = value.every(email => /\S+@\S+\.\S+/.test(email));
                    if (!allEmailIsValid) throw new Error('Um ou mais destinatários são inválidos');
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    throw new Error('Destinatário inválido');
                }
                return true;
            }),
            body('subject').notEmpty().withMessage('Assunto é obrigatório'),
            body('message').notEmpty().withMessage('Mensagem é obrigatório'),
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error(errors.array()[0].msg);
            err.status = 400;
            return next(err);
        }

        const { to, subject, message } = req.body;

        try{
            await sendEmail(to, subject, message);
            res.json({ success: true, message: 'E-mail(s) enviado(s) com sucesso!' })
        } catch (error) {
            next(error);
        }
    }
);

export default router;