exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').createTable('organization', function (table) {
    table.uuid('id', { primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('title').notNullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('deleted_at')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('organization')
}
