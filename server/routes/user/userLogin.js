
import { z } from 'zod'
import { validateRequest } from 'zod-express-middleware'
import { middleware } from '../../util/middleware-helpers.js';
import { getUserByEmail } from '../../database/user/get-user-by-email.js';
import createHttpError from 'http-errors';
import { createJwt } from '../../util/authentication.js';

const userLoginSchema = z.object({
  email: z.string().email(),
});

const userLogin = middleware(async (req, res) => {
  // 401 if the user does not exist
  const { email, role } = req.body;
  const existingUser = await getUserByEmail(email);
  if (!existingUser){
    throw new createHttpError.Unauthorized('unauthorized');
  }

  const token = createJwt(existingUser);
  res.status(201).json({ token });
})

export const userLoginEndpoint = [
  // todo: user auth validation
  validateRequest({ body: userLoginSchema }),
  userLogin,
]