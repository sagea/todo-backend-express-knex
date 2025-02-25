import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware'
import {getOrganizationByIdSql} from '../../database/organization/get-organization-by-id.js'
import { middleware } from '../../util/middleware-helpers.js';

const getOrganizationParamSchema = z.object({
  id: z.string().uuid(),
});

const getOrganization = middleware(async (req, res) => {
  const { id } = req.params;
  const organization = await getOrganizationByIdSql(id);
  if (!organization) {

    res.status(404).json({ error: `Organization not found for "${id}"`});
    return;
  }

  res.status(200).json(organization);
})

export const getOrganizationEndpoint = [
  // todo: user auth validation
  validateRequest({ params: getOrganizationParamSchema }),
  getOrganization,
]