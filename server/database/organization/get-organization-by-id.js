import knex from "../connection.js";

export const getOrganizationByIdSql = async (id) => {
  const organization = await knex('organization').select('*').where({ id, deleted_at: null }).first();
  return organization;
}
