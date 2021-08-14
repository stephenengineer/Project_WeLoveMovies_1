exports.seed = function (knex) {
  return knex("movies_theaters")
    .select("*")
    .where({ movie_id: 1 })
    .update({ is_showing: false });
};
