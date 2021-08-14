const knex = require("../db/connection");

const tableName = "movies";
const tableNameWithAlias = require("../utils/tableNameWithAlias")(tableName);

function list(is_showing = false) {
  if (is_showing) {
    return knex(tableNameWithAlias)
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select(
        "m.movie_id",
        "m.title",
        "m.runtime_in_minutes",
        "m.rating",
        "m.description",
        "m.image_url"
      )
      .where({ is_showing: true })
      .groupBy("m.movie_id")
      .orderBy("m.movie_id");
  }
  return knex(tableNameWithAlias)
    .select(
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url"
    )
    .orderBy("m.movie_id");
}

function read(movie_id) {
  return knex(`${tableNameWithAlias}`)
    .select(
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
      "m.created_at",
      "m.updated_at"
    )
    .where({ movie_id })
    .then((returnedRecords) => returnedRecords[0]);
}

module.exports = {
  list,
  read,
};
