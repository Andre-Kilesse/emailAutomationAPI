import { body, validationResult } from "express-validator";

export const validateEmailRequest = [
    body('to').custom(value => {
        const validate = (email) => /\S+@\S+\.\S+/.test(email);
        if (Array.isArray(value)) {
            if (!value.every(validate)) throw new Error('Um ou mais destinatários são inválidos');
        } else if (!validate(value)) {
            throw new Error('Destinatário inválido');
        }
        return true;
    }),
    body('subject').notEmpty().withMessage('Assunto é obrigatório'),
    body('message').notEmpty().withMessage('Mensagem é obrigatório'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error(errors.array()[0].msg);
            err.status = 400;
            return next(err)
        }
        next();
    }
]