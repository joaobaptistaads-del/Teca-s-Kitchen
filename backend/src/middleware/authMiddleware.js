import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { errorResponse } from '../utils/response.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return errorResponse(res, 'No token provided', 401);
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 'Invalid or expired token', 401);
  }
};
