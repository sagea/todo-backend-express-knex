const knex = require("../connection.js");

const getOrganizationById = async (id) => {
  const organization = await knex('organization').select('*').where({ id }).first();
  return organization;
}



module.exports = getOrganizationById