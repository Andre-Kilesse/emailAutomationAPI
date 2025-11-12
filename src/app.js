import express from 'express';
import dotenvSafe from 'dotenv-safe';
import emailRoutes from './routes/emailRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenvSafe.config();

const app = express();

app.use(express.json());
app.use('/api/email', emailRoutes);

app.use(errorHandler);

export default app;