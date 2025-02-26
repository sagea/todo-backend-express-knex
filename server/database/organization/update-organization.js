import knex from '../connection.js'
import { organizationReturnValue } from './organization-return-value.js'

export const updateOrganizationSql = async (id, title) => {
  const organization = await knex('organization').where({ id }).update({ title }).returning(organizationReturnValue)
  return organization
}
