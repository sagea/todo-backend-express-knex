const { z } = require('zod');
const { validateRequest } = require('zod-express-middleware')
const getOrganizationByIdSql = require('../../database/organization/get-organization-by-id')

const getOrganizationParamSchema = z.object({
  id: z.string().uuid(),
});

const getOrganization = async (req, res) => {
  const { id } = req.params;
  const organization = await getOrganizationByIdSql(id);
  if (!organization) {

    res.status(404).json({ error: `Organization not found for "${id}"`});
    return;
  }

  res.status(200).json(organization);
}

module.exports = [
  // todo: user auth validation
  validateRequest({ params: getOrganizationParamSchema }),
  getOrganization,
]