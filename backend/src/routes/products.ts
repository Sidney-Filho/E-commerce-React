// src/routes/products.ts
import { Router, Request, Response } from 'express';
import connection from '../config/db';
import { RowDataPacket } from 'mysql2'; // Importe RowDataPacket

const router = Router();

// Rota para obter todos os produtos
router.get('/', async (req: Request, res: Response) => {
  try {
    connection.query<RowDataPacket[]>('SELECT * FROM products', (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Database query error' });
      }

      // Mapear os resultados para incluir a URL da imagem com base na categoria
      const productsWithImages = results.map(product => ({
        ...product,
        imageUrl: `http://localhost:3001/assets/images/${product.category}/${product.image}` // Inclui a categoria na URL da imagem
      }));

      res.json(productsWithImages);
    });
  } catch (error) {
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

      // Adiciona a URL da imagem ao produto retornado
      const productWithImage = {
        ...results[0],
        imageUrl: `http://localhost:3001/assets/images/${results[0].category}/${results[0].image}`
      };

      res.json(productWithImage);
    });
  } catch (error) {
    console.error('Internal server error:', error); // Log do erro
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
