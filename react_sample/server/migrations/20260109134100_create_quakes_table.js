/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return await knex.schema.createTable('quakes', (table) => {
        table.increments();
        table.string('location');
        table.string('magnitude');
        table.float('lat');
        table.float('lng');
        table.string('url');
        table.dateTime('time');
        table.specificType('stories', 'text[]');
        table.integer('quake_id').unsigned().references('quakes.id');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('quakes')
};
