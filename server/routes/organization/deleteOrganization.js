import { z } from 'zod'
import { validateRequest } from 'zod-express-middleware'
import { getOrganizationByIdSql } from '../../database/organization/get-organization-by-id.js'
import { deleteOrganizationSql } from '../../database/organization/delete-organization.js'
import { middleware } from '../../util/middleware-helpers.js'
import createError from 'http-errors'
import { authMiddleware } from '../../util/authentication.js'

const deleteOrganizationParamSchema = z.object({
  id: z.string().uuid(),
})

const deleteOrganization = middleware(async (req, res) => {
  const { id } = req.params

  const organization = await getOrganizationByIdSql(id)
  if (!organization) {
    throw new createError.NotFound(`Organization not found for "${id}"`)
  }
  if (organization.creatorId !== req.user.id) {
    throw new createError.Forbidden('You are not allowed to delete this organization')
  }

  await deleteOrganizationSql(id)

  res.status(200).json({ success: true })
})

export const deleteOrganizationEndpoint = [
  // todo: user auth validation
  authMiddleware,
  validateRequest({
    params: deleteOrganizationParamSchema,
  }),
  deleteOrganization,
]
