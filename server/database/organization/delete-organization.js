import knex from "../connection.js";

export const deleteOrganizationSql = async (id) => {
  const organization = await knex('organization')
    .where({ id })
    .update({ deleted_at: knex.fn.now() })
  return organization;
}
