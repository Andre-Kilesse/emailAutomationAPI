import express from 'express';
import dotenv from 'dotenv';
import emailRoutes from './routes/emailRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/email', emailRoutes);

const PORT = 3000;
app.listen(PORT, () =>
console.log(`Server rodando na porta ${PORT}`));