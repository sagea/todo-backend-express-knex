import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware'
import {getOrganizationByIdSql} from '../../database/organization/get-organization-by-id.js'
import { updateOrganizationSql } from '../../database/organization/update-organization.js';
import { middleware } from '../../util/middleware-helpers.js';
import createError from 'http-errors';
import { authMiddleware } from '../../util/authentication.js';
const updateOrganizationParamSchema = z.object({
  id: z.string().uuid(),
});

const updateOrganizationRequestBodySchema = z.object({
  title: z.string().min(3)
});

const updateOrganization = middleware(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const organization = await getOrganizationByIdSql(id);
  if (!organization) {
    throw new createError.NotFound(`Organization not found for "${id}"`)
  }

  if (organization.creatorId !== req.user.id) {
    throw new createError.Forbidden('You are not allowed to update this organization')
  }
  const result = await updateOrganizationSql(id, title)
  
  res.status(200).json(result);
})

export const updateOrganizationEndpoint = [
  // todo: user auth validation
  authMiddleware,
  validateRequest({
    params: updateOrganizationParamSchema,
    body: updateOrganizationRequestBodySchema,
  }),
  updateOrganization,
]