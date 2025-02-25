import knex from "../connection.js";

export const createOrganizationSql = async (title) => {
  const organization = await knex('organization').insert({ title }).returning('*');
  return organization;
}
