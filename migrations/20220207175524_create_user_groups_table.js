/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("user_groups", (table) => {
      table.increments("id");
      table.string("name", 255).notNullable();
      table.timestamps(true, true);
      table.timestamp("deleted_at").defaultTo(null);
    })
    .createTable("users_groups", (table) => {
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
        .inTable("user_groups");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users_groups").dropTable("user_groups");
};
