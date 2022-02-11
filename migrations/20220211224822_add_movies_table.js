/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("movies", (table) => {
    table.increments("id");
    table.text("title").notNullable();
    table.string("tmdb_id", 255).notNullable();
    table.string("poster_path", 255);
    table.integer("user_id").index().defaultTo(null).references('id').inTable('users');
    table.timestamps(true, true);
    table.timestamp('deleted_at').defaultTo(null);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("movies");
};
