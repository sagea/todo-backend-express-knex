const knex = require("../connection.js");

const createOrganization = async (title) => {
  const organization = await knex('organizations').insert({ title }).returning('*');
  return organization;
}



module.exports = createOrganization