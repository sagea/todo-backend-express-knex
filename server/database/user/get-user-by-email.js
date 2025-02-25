import knex from "../connection.js";

export const getUserByEmail = async (email) => {
  const user = await knex('users').where({ email }).returning([
    'id',
    'email',
    'role',
    'created_at as createdAt',
    'updated_at as updatedAt',
    'deleted_at as deletedAt',
  ])
  .first();
  return user;
}
