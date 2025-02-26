import { z } from 'zod'
import { validateRequest } from 'zod-express-middleware'
import { createUserSql } from '../../database/user/create-user.js'
import { middleware } from '../../util/middleware-helpers.js'
import { getUserByEmail } from '../../database/user/get-user-by-email.js'
import createHttpError from 'http-errors'

const createUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
})

const createUser = middleware(async (req, res) => {
  // 400 if user already exists by email
  // 400 role does not exist
  const { email, role } = req.body
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    throw new createHttpError.BadRequest(`User with email "${email}" already exists.`)
  }
  const user = await createUserSql(email, role)
  res.status(201).json(user)
})

export const createUserEndpoint = [
  // todo: user auth validation
  validateRequest({ body: createUserSchema }),
  createUser,
]
