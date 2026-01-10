/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {

    return await knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('username');
        table.string('password');
        table.integer('zipcode');
        // table.specificType('earthquakes', 'text[]');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    return await knex.schema.dropTableIfExists('users')
};
