import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware'
import {getOrganizationByIdSql} from '../../database/organization/get-organization-by-id.js'
import { deleteOrganizationSql } from '../../database/organization/delete-organization.js';
import { middleware } from '../../util/middleware-helpers.js';
import createError from 'http-errors';

const deleteOrganizationParamSchema = z.object({
  id: z.string().uuid(),
});

const deleteOrganization = middleware(async (req, res) => {
  const { id } = req.params;

  const organization = await getOrganizationByIdSql(id);
  if (!organization) {
    throw new createError.NotFound(`Organization not found for "${id}"`)
  }

  await deleteOrganizationSql(id)
  
  res.status(200).json({ success: true });
})

export const deleteOrganizationEndpoint = [
  // todo: user auth validation
  validateRequest({
    params: deleteOrganizationParamSchema,
  }),
  deleteOrganization,
]