import { Router, Request, Response } from 'express';
import connection from '../config/db';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Vamos utilizar JWT para gerar o token de autenticação
import dotenv from 'dotenv';

dotenv.config(); // Certifique-se de carregar as variáveis de ambiente

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret'; // Use uma chave secreta segura, com fallback

// Endpoint de login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Buscar o usuário no banco de dados
    connection.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length === 0) {
          return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        // Verificar se a senha está correta
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Gerar um token JWT
        const token = jwt.sign(
          { id: user.id, username: user.username }, // Dados que você deseja incluir no token
          JWT_SECRET, // Chave secreta
          {
            expiresIn: '1h', // Tempo de expiração
          }
        );

        // Retornar o token e outras informações do usuário, se necessário
        res.status(200).json({ message: 'Login successful', token, user: { id: user.id, username: user.username } });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
