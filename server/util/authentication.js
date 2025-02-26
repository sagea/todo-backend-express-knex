import createHttpError from 'http-errors';
import { config } from './config.js';
import { middleware } from './middleware-helpers.js';
import jsonwebtoken from 'jsonwebtoken';
import { getUserById } from '../database/user/get-user-by-id.js';

export const createJwt = (user) => {
  const jwtSecret = config('JWT_SECRET')
  const token = jsonwebtoken.sign(user, jwtSecret, { expiresIn: '10h' })
  return token
}

export const validateJwt = (jwt) => {
  const jwtSecret = config('JWT_SECRET')
  const decoded = jsonwebtoken.verify(jwt, jwtSecret)
  return decoded
}

export const authMiddleware = middleware(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new createHttpError.Unauthorized('Unauthorized');
  }
  if (req.headers.authorization.split(' ')[0] !== 'Bearer') {
    throw new createHttpError.Unauthorized('Unauthorized');
  }
  const token = req.headers.authorization.split(' ')[1]
  try {
    const decoded = validateJwt(token)
    const user = await getUserById(decoded.id)
    req.user = user

    next()
  } catch (error) {
    throw new createHttpError.Unauthorized('Unauthorized');
  }

});
