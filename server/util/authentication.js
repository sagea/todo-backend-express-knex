import createHttpError from 'http-errors';
import { config } from './config.js';
import { middleware } from './middleware-helpers.js';
import jsonwebtoken from 'jsonwebtoken';

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

export const authMiddleware = middleware((req, res, next) => {
  if (!req.headers.authorization) {
    console.log('no authorization header');
    throw new createHttpError.Unauthorized('Unauthorized');
  }
  if (req.headers.authorization.split(' ')[0] !== 'Bearer') {
    console.log('no bearer');
    throw new createHttpError.Unauthorized('Unauthorized');
  }
  const token = req.headers.authorization.split(' ')[1]
  try {
    const decoded = validateJwt(token)
    req.user = decoded
    next()
  } catch (error) {
    console.log('authorization error', error);
    throw new createHttpError.Unauthorized('Unauthorized');
  }

});
