import knex from "../connection.js";

export const updateOrganizationSql = async (id, title) => {
  const organization = await knex('organization')
    .where({ id })
    .update({ title })
    .returning([
      'id',
      'title',
      'created_at as createdAt',
      'updated_at as updatedAt',
      'deleted_at as deletedAt'
    ]);
  return organization;
}
