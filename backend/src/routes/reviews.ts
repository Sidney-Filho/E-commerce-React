import { Router, Request, Response } from 'express';
import connection from '../config/db';
import { RowDataPacket, OkPacket } from 'mysql2'; // Importe OkPacket para INSERT/DELETE operations

const router = Router();

// Rota para obter os reviews de um produto específico
router.get('/:productId', async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    connection.query<RowDataPacket[]>(
      'SELECT * FROM reviews WHERE productId = ?', [productId],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Database query error' });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: 'No reviews found' });
        }
        res.json(results); // Retorna os reviews
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rota para postar um novo review
router.post('/', async (req: Request, res: Response) => {
  const { productId, rating, text, userId } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'You must be logged in to submit a review' });
  }

  try {
    // Insere um novo review na tabela de reviews
    connection.query<OkPacket>(
      'INSERT INTO reviews (productId, rating, text, created_at) VALUES (?, ?, ?, ?)',
      [productId, rating, text, userId],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to save review' });
        }

        // Depois de inserir o review, calcular a nova média de avaliações
        connection.query<RowDataPacket[]>(
          'SELECT AVG(rating) as averageRating FROM reviews WHERE productId = ?',
          [productId],
          (error, avgResults) => {
            if (error) {
              return res.status(500).json({ error: 'Failed to calculate average rating' });
            }
            const averageRating = avgResults[0].averageRating;
            res.status(201).json({
              review: {
                id: results.insertId,
                productId,
                rating,
                text,
                userId
              },
              averageRating
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rota para deletar um review pelo ID
router.delete('/:reviewId', async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  try {
    // Deleta o review pelo ID
    connection.query<OkPacket>(
      'DELETE FROM reviews WHERE id = ?',
      [reviewId],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to delete review' });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Review not found' });
        }

        res.json({ message: 'Review deleted successfully' });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
