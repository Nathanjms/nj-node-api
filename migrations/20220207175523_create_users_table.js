/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("email", 255).notNullable().unique();
    table.text("password").notNullable();
    table.string("name", 255).notNullable();
    table.timestamps(true, true);
    table.timestamp("deleted_at").defaultTo(null);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
