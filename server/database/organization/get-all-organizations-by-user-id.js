
import knex from "../connection.js";
import { organizationReturnValue } from "./organization-return-value.js";

export const getAllOrganizationsByUserId = async (userId) => {
  const organizations = await knex('user_organization as uo')
    .innerJoin('organization as o', 'uo.organization_id', 'o.id')
    .where('o.deleted_at', null)
    .where('uo.user_id', userId)
    .select([
      'o.id',
      'o.title',
      'o.created_at as createdAt',
      'o.updated_at as updatedAt',
      'o.deleted_at as deletedAt',
      'o.creator_id as creatorId',
    ]);
  return organizations;
}
