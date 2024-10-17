import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = 'seu_jwt_secreto_aqui'; // Use a mesma chave secreta

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // O token deve ser enviado no cabeçalho "Authorization"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, JWT_SECRET) as string | JwtPayload;
    
    // Atribui o usuário decodificado à requisição
    req.user = decoded;
    
    next(); // Continua para a próxima função middleware
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};
