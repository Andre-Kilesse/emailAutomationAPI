import express from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import { validateEmailRequest } from '../middlewares/validateEmailRequest.js';
import { handleEmailSend } from '../controllers/emailController.js';

const router = express.Router();

router.post('/send', upload.single('file'), validateEmailRequest, handleEmailSend);

export default router;