import knex from '../connection.js'
import { organizationReturnValue } from './organization-return-value.js'
export const createOrganizationSql = async (userId, title) => {
  const res = await knex.transaction(async (trx) => {
    const organization = await trx('organization')
      .insert({ title, creator_id: userId })
      .returning(organizationReturnValue)
    await trx('user_organization').insert({ user_id: userId, organization_id: organization[0].id })
    return organization[0]
  })
  return res
}
