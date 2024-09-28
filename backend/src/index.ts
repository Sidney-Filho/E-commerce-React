// src/index.ts
import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';
import reviewsRouter from './routes/reviews'

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Config do diretorio estatico
app.use('../../src/assets', express.static('assets'))

// Use as rotas de produtos
app.use('/api/products', productsRouter);
app.use('/api/reviews', reviewsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
