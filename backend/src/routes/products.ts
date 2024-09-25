// src/routes/products.ts
import { Router, Request, Response } from 'express';
import connection from '../config/db';
import { RowDataPacket } from 'mysql2'; // Importe RowDataPacket

const router = Router();

// Rota para obter todos os produtos
router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('Request to fetch all products');
    connection.query<RowDataPacket[]>('SELECT * FROM products', (error, results) => {
      if (error) {
        console.error('Database query error:', error); // Log do erro
        return res.status(500).json({ error: 'Database query error' });
      }
      console.log('Products fetched:', results); // Log dos produtos obtidos
      res.json(results);
    });
  } catch (error) {
    console.error('Internal server error:', error); // Log do erro
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rota para obter um produto pelo ID
router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log('Request to fetch product by ID:', id);
  try {
    connection.query<RowDataPacket[]>('SELECT * FROM products WHERE id = ?', [id], (error, results) => {
      if (error) {
        console.error('Database query error:', error); // Log do erro
        return res.status(500).json({ error: 'Database query error' });
      }
      if (results.length === 0) {
        console.log('Product not found for ID:', id); // Log se o produto não for encontrado
        return res.status(404).json({ error: 'Product not found' });
      }
    });
  } catch (error) {
    console.error('Internal server error:', error); // Log do erro
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
