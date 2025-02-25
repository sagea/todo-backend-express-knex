import { z } from 'zod'
import { validateRequest } from 'zod-express-middleware'
import {createOrganizationSql} from '../../database/organization/create-organization.js'
import { middleware } from '../../util/middleware-helpers.js';

const createOrganizationSchema = z.object({
  title: z.string().min(3),
});

const createOrganization = middleware(async (req, res) => {
  const { title } = req.body;
  const organization = await createOrganizationSql(title);
  res.status(201).json(organization);
})

export const createOrganizationEndpoint = [
  // todo: user auth validation
  validateRequest({ body: createOrganizationSchema }),
  createOrganization,
]