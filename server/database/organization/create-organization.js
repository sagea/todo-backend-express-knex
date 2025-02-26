import knex from "../connection.js";

export const createOrganizationSql = async (userId, title) => {
  return knex.transaction(async (trx) => {
    const organization = await trx('organization').insert({ title, creator_id: userId }).returning('*');
    await trx('user_organization').insert({ user_id: userId, organization_id: organization[0].id });
    return organization;
  });
}
