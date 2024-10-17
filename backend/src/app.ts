import express, { Application } from 'express';
import cors from 'cors';
import productsRoutes from './routes/products';
import loginRoutes from './routes/login';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', productsRoutes);
app.use('/api', loginRoutes);

export default app;
