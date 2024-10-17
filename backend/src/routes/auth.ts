import { Router, Request, Response } from 'express';
import connection from '../config/db';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';

const router = Router();

// Endpoint para registrar um novo usuário
router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Verificar se o nome de usuário ou email já está em uso
    connection.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username],
      async (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Database query error' });
        }
        if (results.length > 0) {
          return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserir novo usuário no banco de dados
        connection.query(
          'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
          [username, email, hashedPassword],
          (error) => {
            if (error) {
              return res.status(500).json({ error: 'Failed to register user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
