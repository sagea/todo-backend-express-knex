import knex from "../connection.js";

export const createUserSql = async (email, role) => {
  const user = await knex('users').insert({ email, role }).returning([
    'id',
    'email',
    'role',
    'created_at as createdAt',
    'updated_at as updatedAt',
    'deleted_at as deletedAt',
  ]);
  return user;
}
