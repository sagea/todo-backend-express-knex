import knex from '../connection.js'

export const getUserById = async (id) => {
  const user = await knex('users')
    .where({ id })
    .returning(['id', 'email', 'role', 'created_at as createdAt', 'updated_at as updatedAt', 'deleted_at as deletedAt'])
    .first()
  return user
}
