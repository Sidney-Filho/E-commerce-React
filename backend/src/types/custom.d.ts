import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; // A propriedade user será opcional e pode ser uma string ou JwtPayload
    }
  }
}
