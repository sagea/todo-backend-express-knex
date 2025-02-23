const { z } = require('zod');
const { validateRequest } = require('zod-express-middleware')
const createOrganizationSql = require('../../database/organization/create-organization.js')

const createOrganizationSchema = z.object({
  title: z.string().min(3),
});

const createOrganization = async (req, res) => {
  const { title } = req.body;
  const organization = await createOrganizationSql(title);
  res.status(201).json(organization);
}

module.exports = [
  // todo: user auth validation
  validateRequest({ body: createOrganizationSchema }),
  createOrganization,
]