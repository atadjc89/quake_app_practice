 const func = require('../seed_maker').func;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  let values = await func();
  //console.log(values, 'args');
  // Deletes ALL existing entries
  await knex('quakes').del()
  for (value of values) {
    await knex('quakes').insert({
      location: value.location,
      magnitude: value.magnitude,
      lat: value.lat,
      lng: value.lng,
      url: value.url,
      time: value.time,
      stories: []
    })
  }

};
