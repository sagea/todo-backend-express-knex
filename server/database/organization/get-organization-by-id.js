import knex from "../connection.js";
import { organizationReturnValue } from "./organization-return-value.js";

export const getOrganizationByIdSql = async (id) => {
  const organization = await knex('organization').select(organizationReturnValue).where({ id, deleted_at: null }).first();
  return organization;
}
