const knex = require('knex');

exports.up =  async function(knex) {
  return knex.schema.createTable('taxes', (table) => {
    table.increments('id').primary();
    table.string('from').notNullable();
    table.string('to').notNullable();
    table.string('value').notNullable();
  });
}

exports.down = async function (knex) {
  return knex.schema.dropTable('taxes');
}
