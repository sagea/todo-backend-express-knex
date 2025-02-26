import { middleware } from '../../util/middleware-helpers.js';
import { getAllOrganizationsByUserId } from '../../database/organization/get-all-organizations-by-user-id.js';
import { authMiddleware } from '../../util/authentication.js';
const getUserOrganizations = middleware(async (req, res) => {
  const organizations = await getAllOrganizationsByUserId(req.user.id);
  res.status(200).json(organizations);
})

export const getUserOrganizationsEndpoint = [
  // todo: user auth validation
  authMiddleware,
  getUserOrganizations,
]