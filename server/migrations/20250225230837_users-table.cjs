/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(`CREATE TYPE user_roll as ENUM ('admin', 'user')`).createTable('users', function (table) {
    table.uuid('id', { primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('email').notNullable()
    table
      .enu('roll', null, {
        useNative: true,
        existingType: true,
        enumName: 'user_roll',
      })
      .defaultTo('admin')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('deleted_at')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users').raw('DROP TYPE user_roll')
}
