/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("user_movie_groups", (table) => {
      table.increments("id");
      table.string("name", 255).notNullable();
      table.timestamps(true, true);
      table.timestamp("deleted_at").defaultTo(null);
    })
    .createTable("users_movie_groups_link", (table) => {
      table.increments("id");
      table
        .integer("user_id")
        .index()
        .defaultTo(null)
        .references("id")
        .inTable("users");
      table
        .integer("group_id")
        .index()
        .defaultTo(null)
        .references("id")
        .inTable("user_movie_groups");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users_movie_groups_link").dropTable("user_movie_groups");
};
