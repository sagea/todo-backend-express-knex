import knex from 'knex'
import knexConfig from '../knexfile.js'

// Abstraction layer to handle knex configuration per enviornment.
const environment = process.env.NODE_ENV || 'development'

const config = knexConfig[environment]

export default knex(config)
