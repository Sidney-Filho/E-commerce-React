import express, { Application } from 'express';
import cors from 'cors';
import productsRoutes from './routes/products';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', productsRoutes);

export default app;
